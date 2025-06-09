from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV

def grid_search(data, target):
    """
    Perform grid search to find the best hyperparameters for the model.

    This function loads the data, defines a parameter grid, initializes the model,
    and performs grid search using cross-validation.

    Returns:
        best_model: The best estimator found by the grid search.
    """
    # Define parameter grid for DecisionTreeClassifier
    param_grid = {
        'max_depth': [3, 5, 7, 10, None],
        'min_samples_split': [2, 5, 10, 20],
        'min_samples_leaf': [1, 2, 4, 8],
        'criterion': ['gini', 'entropy', 'log_loss'],
        'max_features': [None, 'sqrt', 'log2'],
        'splitter': ['best', 'random']
    }
    # Initialize the model
    model = DecisionTreeClassifier(random_state=0)
    # Perform grid search
    gs = GridSearchCV(model, param_grid, cv=5, scoring='accuracy')
    gs.fit(data, target)
    return gs.best_estimator_
