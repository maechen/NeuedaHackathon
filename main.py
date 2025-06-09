import firebase_admin
from firebase_admin import credentials, db
from NeuedaHackathon.Data.data import process_data, get_data
from NeuedaHackathon.Model.model import get_model, get_accuracy, get_confusion_matrix

# # Load the data
# X_train, X_test, y_train, y_test = process_data("bank_loan.csv")
#
# # Load or make the model
# model = get_model(data_path="bank_loan.csv")
#
# # Predict probabilities
# probabilities = model.predict_proba(X_test)[:, 1]
#
# # Calculate accuracy
# accuracy = get_accuracy(model, X_test, y_test)
# print(f"Model Accuracy: {accuracy:.2f}")
#
# # Calculate confusion matrix
# cm = get_confusion_matrix(model, X_test, y_test)
# print("Confusion Matrix:")
# print(cm)

# Initialize Firebase Admin SDK

cred = credentials.Certificate("neueda-hackathon-firebase-adminsdk-fbsvc-46920acc69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://neueda-hackathon-default-rtdb.firebaseio.com/'
})

ref = db.reference('loans')
data = ref.get()
print(data)
