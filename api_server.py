#!/usr/bin/env python3
"""
Flask API server for loan pre-approval predictions.
Integrates with Firebase for user data and uses trained ML model for predictions.
"""

import os
import sys
import json
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

try:
    import joblib
    JOBLIB_AVAILABLE = True
except ImportError:
    JOBLIB_AVAILABLE = False
    print("joblib not available.")

# Add the project directory to the Python path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

try:
    import firebase_admin
    from firebase_admin import credentials, db
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    print("Firebase Admin SDK not available. Running without Firebase integration.")

try:
    from Model.model import get_model
    MODEL_AVAILABLE = True
except ImportError:
    MODEL_AVAILABLE = False
    print("Model import failed. Using mock predictions.")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize Firebase Admin SDK
firebase_initialized = False
if FIREBASE_AVAILABLE:
    try:
        # Initialize Firebase Admin (you'll need to add your service account key)
        # For now, we'll use the existing database URL from the frontend config
        # In production, use a proper service account key file
        
        # Use the database URL from the frontend Firebase config
        firebase_admin.initialize_app(options={
            'databaseURL': 'https://neueda-hackathon-default-rtdb.firebaseio.com'
        })
        firebase_initialized = True
        logger.info("Firebase Admin initialized successfully")
    except Exception as e:
        logger.warning(f"Firebase Admin initialization failed: {e}")
        logger.info("Continuing without Firebase Admin - using mock data for development")
else:
    logger.info("Firebase Admin SDK not available - using mock data for development")

# Load the trained model
model = None
if MODEL_AVAILABLE:
    try:
        # Check if model file exists first
        model_path = "best_model.joblib"
        if os.path.exists(model_path) and JOBLIB_AVAILABLE:
            model = joblib.load(model_path)
            logger.info("Pre-trained model loaded successfully")
        else:
            logger.info("No pre-trained model found, will use get_model() to train")
            model = get_model(data_path="bank_loan.csv")
            logger.info("Model trained and loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        logger.info("Using mock predictions instead")
else:
    logger.info("Model not available - using mock predictions")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'timestamp': pd.Timestamp.now().isoformat()
    })

@app.route('/api/predict', methods=['POST'])
def predict_loan_approval():
    """
    Predict loan approval probability based on user input.
    Expected input format matches PersonalLoanForm fields.
    """
    try:
        # Get data from request
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        logger.info(f"Received prediction request: {data}")
        
        # Extract user input
        age = float(data.get('age', 0))
        income = float(data.get('income', 0))
        family_size = int(data.get('familySize', 1))
        education_level = data.get('education', 'Graduate')
        mortgage = float(data.get('mortgageAmount', 0))
        personal_loans = int(data.get('personalLoans', 0))
        securities = int(data.get('securityAccounts', 0))
        cd_account = int(data.get('creditAccounts', 0))
        cc_usage = float(data.get('ccUsage', 0))
        
        # Map education to numeric values (based on CSV data: 1, 2, 3)
        education_mapping = {
            'Undergrad': 1,
            'Graduate': 2, 
            'Advanced/Professional': 3
        }
        education_numeric = education_mapping.get(education_level, 2)
        
        # Calculate CCAvg (credit card average spending per month in thousands)
        cc_avg = cc_usage if cc_usage > 0 else 0
        
        # Estimate experience based on age (assume people start working at 22)
        experience = max(0, age - 22)
        
        # Create base input data
        user_input = {
            'Age': age,
            'Experience': experience,
            'Income': income,
            'CCAvg': cc_avg,
            'Mortgage': mortgage,
            'Personal Loan': personal_loans,
            'Securities Account': securities,
            'CD Account': cd_account,
            'Online': 1,  # Assume online application
            'CreditCard': 1,  # Assume has credit card
            'Family': family_size,
            'Education': education_numeric
        }
        
        # Create DataFrame for prediction
        input_df = pd.DataFrame([user_input])
        
        # One-hot encode categorical variables to match training data
        input_df = pd.get_dummies(input_df, columns=['Family', 'Education'])
        
        # Ensure all required columns are present (match actual training data structure)
        expected_columns = [
            'Age', 'Experience', 'Income', 'CCAvg', 'Mortgage', 'Personal Loan',
            'Securities Account', 'CD Account', 'Online', 'CreditCard',
            'Family_1', 'Family_2', 'Family_3', 'Family_4',
            'Education_1', 'Education_2', 'Education_3'
        ]
        
        # Add missing columns with default values
        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0
        
        # Reorder columns to match training data
        input_df = input_df[expected_columns]
        
        if model is None:
            # Return mock prediction for development
            mock_probability = np.random.uniform(0.3, 0.9)
            logger.info(f"Using mock prediction: {mock_probability:.2f}")
        else:
            # Make prediction
            probability = model.predict_proba(input_df)[0][1]
            mock_probability = probability
            logger.info(f"Model prediction: {mock_probability:.2f}")
        
        # Convert to percentage
        approval_percentage = int(mock_probability * 100)
        
        # Store prediction in Firebase (if available)
        if firebase_initialized and FIREBASE_AVAILABLE:
            try:
                user_id = data.get('userId', 'anonymous')
                prediction_data = {
                    'user_input': user_input,
                    'approval_percentage': approval_percentage,
                    'timestamp': pd.Timestamp.now().isoformat(),
                    'model_version': '1.0'
                }
                
                # Save to Firebase
                ref = db.reference(f'predictions/{user_id}')
                ref.push(prediction_data)
                logger.info(f"Prediction saved to Firebase for user: {user_id}")
                
            except Exception as e:
                logger.warning(f"Failed to save to Firebase: {e}")
        else:
            logger.info("Firebase not available - skipping data storage")
        
        return jsonify({
            'approval_percentage': approval_percentage,
            'confidence': 'high' if approval_percentage > 70 or approval_percentage < 30 else 'medium',
            'timestamp': pd.Timestamp.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/history/<user_id>', methods=['GET'])
def get_user_history(user_id):
    """Get prediction history for a user"""
    if not firebase_initialized or not FIREBASE_AVAILABLE:
        return jsonify({'history': [], 'message': 'Firebase not available'})
        
    try:
        ref = db.reference(f'predictions/{user_id}')
        history = ref.get()
        
        if not history:
            return jsonify({'history': []})
        
        # Convert to list format
        history_list = []
        for key, value in history.items():
            value['id'] = key
            history_list.append(value)
        
        # Sort by timestamp (most recent first)
        history_list.sort(key=lambda x: x.get('timestamp', ''), reverse=True)
        
        return jsonify({'history': history_list})
        
    except Exception as e:
        logger.error(f"Error fetching user history: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/model/stats', methods=['GET'])
def get_model_stats():
    """Get model performance statistics"""
    if not MODEL_AVAILABLE:
        return jsonify({'error': 'Model not available', 'message': 'Using mock predictions'}), 503
        
    try:
        # Load test data for stats
        from Data.data import process_data
        X_train, X_test, y_train, y_test = process_data("bank_loan.csv")
        
        if model:
            from Model.model import get_accuracy
            accuracy = get_accuracy(model, X_test, y_test)
            
            return jsonify({
                'accuracy': round(accuracy, 3),
                'model_type': 'Decision Tree Classifier',
                'training_samples': len(X_train),
                'test_samples': len(X_test),
                'features': len(X_train.columns)
            })
        else:
            return jsonify({'error': 'Model not loaded'}), 500
            
    except Exception as e:
        logger.error(f"Error getting model stats: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    logger.info(f"Starting Flask server on port {port}")
    logger.info(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
