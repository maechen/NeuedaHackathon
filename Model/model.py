import os
import joblib
from Data.data import process_data
from Model.gs import grid_search
from sklearn.metrics import accuracy_score, confusion_matrix

def get_model(model_path="", data_path="../bank_loan.csv", model_name="best_model.joblib"):
    """
    Load the best model from disk or train a new one if it doesn't exist.

    Returns:
        model: The best trained model.
    """
    # Return the model if it already exists
    if os.path.exists(model_path):
        return joblib.load(model_path)
    # Load and preprocess the data
    X_train, X_test, y_train, y_test = process_data(data_path)
    # Train best model
    model = grid_search(X_train, y_train)
    # Save the model to disk
    joblib.dump(model, model_name)
    return model

def get_accuracy(model, data, target):
    """
    Calculate the accuracy of the model on the test set.

    Args:
        model: The trained model.
        data (Pandas DataFrame): Test dataset.
        target (Pandas Series): Test target.

    Returns:
        accuracy: The accuracy of the model on the test set.
    """
    # Make predictions
    predictions = model.predict(data)
    # Calculate accuracy
    accuracy = accuracy_score(target, predictions)
    return accuracy

def get_confusion_matrix(model, data, target):
    """
    Calculate the confusion matrix of the model on the test set.

    Args:
        model: The trained model.
        data (Pandas DataFrame): Test dataset.
        target (Pandas Series): Test target.

    Returns:
        cm: The confusion matrix of the model on the test set.
    """
    # Make predictions
    predictions = model.predict(data)
    # Calculate confusion matrix
    cm = confusion_matrix(target, predictions)
    return cm
