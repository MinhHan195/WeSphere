import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_regression, make_blobs
from sklearn.model_selection import train_test_split

from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error


from sklearn.datasets import load_diabetes
from sklearn.cluster import KMeans
from math import sqrt

X, Y = make_regression(n_samples=100, n_features=1, noise=0.2, random_state=42)

X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.2, random_state=42)

knn_regressor = KNeighborsRegressor(n_neighbors=5)
knn_regressor.fit(X_train, Y_train)
knn_y_pred = knn_regressor.predict(X_test)

decision_tree_regressor = DecisionTreeRegressor(random_state=42)
decision_tree_regressor.fit(X_train, Y_train)
decision_tree_y_pred = decision_tree_regressor.predict(X_test)

plt.figure(figsize=(12,5))
plt.subplot(121)
plt.scatter(X_test, Y_test, label='Du lieu thuc te')
plt.scatter(X_test, knn_y_pred, color='red', label = 'Du doan (KNN)')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Hoi quy KnNN')
plt.legend()

plt.subplot(122)
plt.scatter(X_test, Y_test, label='Du lieu thuc te')
plt.scatter(X_test, decision_tree_y_pred, color='green', label = 'Du doan (Decision Tree)')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Hoi quy KnNN')
plt.legend()
plt.show()