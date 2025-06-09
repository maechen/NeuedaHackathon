# Loan Pre-Approval System

A comprehensive loan pre-approval application that integrates React frontend, Python ML backend, and Firebase for authentication and data storage.

## 🎯 Features

-   **User Authentication**: Firebase-powered sign-in- `PORT`: API server port (default: 5002)sign-up system
-   **Loan Application Form**: Comprehensive form with 10+ input fields
-   **ML-Powered Predictions**: DecisionTree Classifier for approval likelihood
-   **Real-time Results**: Dynamic approval percentage with visual indicators
-   **Data Storage**: Firebase Realtime Database for user data and predictions
-   **RESTful API**: Flask backend with multiple endpoints
-   **Responsive UI**: Modern React interface with beautiful animations

## 🏗️ System Architecture

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐    📊 ML Model    ┌─────────────────┐
│   React         │ ────────────── │   Flask API     │ ──────────────── │  scikit-learn   │
│   Frontend      │                 │   Backend       │                  │  Decision Tree  │
│                 │                 │                 │                  │                 │
│ • Authentication│                 │ • /api/predict  │                  │ • Training Data │
│ • Forms         │                 │ • /api/health   │                  │ • Preprocessing │
│ • Results       │                 │ • /api/stats    │                  │ • Predictions   │
└─────────────────┘                 └─────────────────┘                  └─────────────────┘
         │                                   │
         │                                   │
         │          🔥 Firebase              │
         └─────────── Database ──────────────┘
                  • User Auth
                  • Predictions
                  • History

```

## 🚀 Quick Start

### Prerequisites

-   Python 3.7+
-   Node.js 14+
-   npm or yarn

### Installation & Setup

1. **Clone and navigate to the project directory**
2. **Option A: One-Command Startup (Recommended)**:

    ```bash
    ./start_system.sh
    ```

    This single script will:

    - Set up Python virtual environment (if needed)
    - Install dependencies
    - Train ML model (if needed)
    - Start both backend API and frontend
    - Display all access URLs
    - Handle graceful shutdown with Ctrl+C

3. **Option B: Manual Setup**:

    a. **Run the automated setup**:

    ```bash
    ./setup.sh
    ```

    b. **Start the backend** (Terminal 1):

    ```bash
    ./start_backend.sh
    ```

    c. **Start the frontend** (Terminal 2):

    ```bash
    ./start_frontend.sh
    ```

4. **Access the application**:
    - Frontend: http://localhost:5173
    - API Health: http://localhost:5002/api/health

### 🔍 System Status Check

To verify both services are running correctly:

```bash
./check_status.sh
```

## 📋 Application Workflow

### 1. User Authentication

-   Users create an account or sign in using Firebase Authentication
-   User data is stored securely in Firebase Realtime Database

### 2. Loan Application

Users input the following information:

-   **Personal**: Age, Income, ZIP Code, Family Size
-   **Education**: Education level (High School to Doctorate)
-   **Financial**: Mortgage Amount, Personal Loans, Security Accounts
-   **Credit**: Credit Accounts, Credit Card Usage

### 3. ML Prediction Process

1. Form data is sent to Flask API (`/api/predict`)
2. Data is preprocessed and formatted for the ML model
3. DecisionTree Classifier analyzes the input
4. Approval percentage is calculated and returned
5. Results are stored in Firebase for history tracking

### 4. Results Display

-   Dynamic circular progress indicator
-   Color-coded approval percentage (red to green)
-   Interactive slider for testing different percentages
-   Navigation to bank page for next steps

## 🔧 API Endpoints

### POST `/api/predict`

Predicts loan approval probability

```json
{
    "age": 35,
    "income": 75000,
    "familySize": 3,
    "education": "Graduate",
    "mortgageAmount": 200000,
    "personalLoans": 0,
    "securityAccounts": 1,
    "creditAccounts": 2,
    "ccUsage": 15,
    "userId": "user123"
}
```

**Response:**

```json
{
    "approval_percentage": 78,
    "confidence": "high",
    "timestamp": "2025-06-09T10:30:00Z"
}
```

### GET `/api/health`

System health check

```json
{
    "status": "healthy",
    "model_loaded": true,
    "timestamp": "2025-06-09T10:30:00Z"
}
```

### GET `/api/model/stats`

Model performance statistics

```json
{
    "accuracy": 0.842,
    "model_type": "Decision Tree Classifier",
    "training_samples": 4000,
    "test_samples": 1000,
    "features": 13
}
```

### GET `/api/user/history/<user_id>`

User prediction history

```json
{
  "history": [
    {
      "id": "pred123",
      "approval_percentage": 78,
      "timestamp": "2025-06-09T10:30:00Z",
      "user_input": {...}
    }
  ]
}
```

## 🤖 Machine Learning Model

### Model Details

-   **Algorithm**: DecisionTree Classifier
-   **Features**: 13 processed features including demographics, financials, and credit info
-   **Training**: Grid search with cross-validation for hyperparameter optimization
-   **Data**: Bank loan dataset with preprocessing pipeline

### Feature Engineering

1. **Categorical Encoding**: One-hot encoding for Family and Education
2. **Credit Card Processing**: Convert usage percentages to model format
3. **Feature Scaling**: Normalized for optimal performance
4. **Missing Data**: Handled with default values

### Model Performance

-   Accuracy: ~84% (varies with training data)
-   Cross-validation: 5-fold CV for robust evaluation
-   Hyperparameters: Optimized max_depth, min_samples_split, etc.

## 🔥 Firebase Integration

### Authentication

-   Email/password authentication
-   User session management
-   Secure user data handling

### Database Structure

```
users/
  {uid}/
    email: "user@example.com"
    createdAt: "2025-06-09T10:30:00Z"

predictions/
  {uid}/
    {predictionId}/
      user_input: {...}
      approval_percentage: 78
      timestamp: "2025-06-09T10:30:00Z"
      model_version: "1.0"
```

## 🎨 Frontend Features

### React Components

-   **App.jsx**: Main application router and state management
-   **PersonalLoanForm.jsx**: Comprehensive form with validation
-   **ApprovalResult.jsx**: Animated results with circular progress
-   **Firebase.js**: Authentication and database configuration

### UI/UX Features

-   Responsive design for all screen sizes
-   Loading states and error handling
-   Smooth animations and transitions
-   Color-coded approval indicators
-   Interactive testing controls

## 🔒 Security & Privacy

-   Firebase Authentication for secure user management
-   Input validation and sanitization
-   CORS configuration for API security
-   No sensitive data logged or exposed
-   User data encrypted in Firebase

## 🛠️ Development

### Project Structure

```
NeuedaHackathon/
├── src/                    # React frontend
│   ├── App.jsx
│   ├── PersonalLoanForm.jsx
│   ├── ApprovalResult.jsx
│   └── firebase.js
├── Model/                  # ML model files
│   ├── model.py
│   └── gs.py
├── Data/                   # Data processing
│   └── data.py
├── api_server.py          # Flask backend
├── bank_loan.csv          # Training dataset
├── setup.sh              # Setup script
└── README.md
```

## 🛠️ Available Scripts

### Main Scripts

| Script            | Purpose                    | Usage               |
| ----------------- | -------------------------- | ------------------- |
| `start_system.sh` | **🚀 Start entire system** | `./start_system.sh` |
| `setup.sh`        | Initial project setup      | `./setup.sh`        |
| `check_status.sh` | Verify system status       | `./check_status.sh` |

### Individual Service Scripts

| Script                  | Purpose                 | Usage                     |
| ----------------------- | ----------------------- | ------------------------- |
| `start_backend.sh`      | Start API server only   | `./start_backend.sh`      |
| `start_frontend.sh`     | Start React app only    | `./start_frontend.sh`     |
| `start_backend_venv.sh` | Start backend with venv | `./start_backend_venv.sh` |

### Script Features

-   **`start_system.sh`** (Recommended):

    -   ✅ One-command startup
    -   ✅ Automatic dependency installation
    -   ✅ ML model training (if needed)
    -   ✅ Health checks and validation
    -   ✅ Graceful shutdown with Ctrl+C
    -   ✅ Process monitoring

-   **`check_status.sh`**:
    -   ✅ Frontend accessibility check
    -   ✅ Backend API health verification
    -   ✅ Model loading status
    -   ✅ Access URLs display

### Environment Variables

-   `DEBUG`: Enable debug mode (default: True)
-   `PORT`: API server port (default: 5002)
-   `FLASK_ENV`: Flask environment (default: development)

### Testing

-   Backend: Use tools like Postman or curl for API testing
-   Frontend: Built-in React dev tools and browser console
-   Model: Cross-validation and accuracy metrics

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

-   Check Python dependencies: `pip3 install -r api_requirements.txt`
-   Verify Python 3 is installed: `python3 --version`

**Frontend won't start:**

-   Check Node.js dependencies: `npm install`
-   Verify Node.js is installed: `node --version`

**Model errors:**

-   System falls back to mock predictions automatically
-   Check data file exists: `bank_loan.csv`

**Firebase errors:**

-   System works with mock data if Firebase unavailable
-   Check Firebase configuration in `src/firebase.js`

### Development Mode

The system is designed to gracefully handle missing dependencies:

-   **No ML model**: Uses mock predictions
-   **No Firebase**: Uses local mock data
-   **Network issues**: Displays appropriate error messages

## 📊 Performance

-   **Frontend**: Optimized React components with efficient state management
-   **Backend**: Async Flask handling with proper error management
-   **ML Model**: Fast predictions (~10ms) with preprocessed features
-   **Database**: Real-time Firebase updates with minimal latency

## 🤝 Contributing

1. Follow the existing code structure and styling
2. Add proper error handling and logging
3. Update documentation for new features
4. Test both happy path and error scenarios
5. Ensure Firebase and ML model fallbacks work

## 📄 License

This project is developed for the Neueda Hackathon.

---

**Built with ❤️ using React, Flask, scikit-learn, and Firebase**
