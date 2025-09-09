import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Load dataset
data = pd.read_csv("dataset/breast_cancer.csv")

X = data.drop("target", axis=1)  # assuming target column is 'target'
y = data["target"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)

# Save model & scaler
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/tabular_model.pkl")
joblib.dump(scaler, "model/scaler.pkl")

print("✅ Tabular model trained and saved!")
