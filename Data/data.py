import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

def process_data(path):
    """
        Reads a bank loan CSV dataset, preprocesses the data, and splits it into training and testing sets.

        Steps performed:
        - Loads the dataset from the specified path.
        - Drops unnecessary columns ('ID', 'ZIP Code').
        - One-hot encodes the 'Family' and 'Education' categorical features.
        - Converts the 'CCAvg' column from a string fraction (e.g., '1/60') to a numeric value, handling division by zero.
        - Creates a random binary target variable for loan approval.
        - Splits the processed data and target into training and testing sets.

        Args:
            path (str): Path to the CSV file.

        Returns:
            tuple: (X_train, X_test, y_train, y_test) where each is a pandas DataFrame.
        """
    # Read the CSV file
    data = pd.read_csv(path)
    # Create a target variable for loan approval
    target = np.random.randint(0, 2, size=len(data))
    # Drop unnecessary columns
    data = data.drop(columns=['ID', 'ZIP Code'])
    # OneHotEncode categorical variables
    data = pd.get_dummies(data, columns=['Family', 'Education'])
    # Convert CCAvg to numeric
    data['CCAvg'] = data['CCAvg'].apply(lambda x: float(x.split('/')[0]) * 1000 / float(x.split('/')[1]) if
                                        float(x.split('/')[1]) != 0 else 0)
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(data, target, test_size=0.2, random_state=0)
    return X_train, X_test, y_train, y_test

