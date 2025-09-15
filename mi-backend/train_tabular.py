import os
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib

os.makedirs("dataset", exist_ok=True)
csv_path = "dataset/breast_cancer.csv"

# Load dataset from CSV if present; otherwise fetch from sklearn and save
def load_or_create_dataset(path: str) -> pd.DataFrame:
    try:
        if os.path.exists(path):
            df = pd.read_csv(path)
            # If file exists but is empty or missing target, rebuild
            if df.empty or "target" not in df.columns:
                raise ValueError("Invalid or empty CSV, regenerating")
            return df
        raise FileNotFoundError
    except Exception:
        sklearn_data = load_breast_cancer()
        df = pd.DataFrame(sklearn_data.data, columns=sklearn_data.feature_names)
        df.rename(columns=lambda c: c.replace(" ", "_"), inplace=True)
        df["target"] = sklearn_data.target
        df.to_csv(path, index=False)
        return df

data = load_or_create_dataset(csv_path)

# Use only the 10 mean features that match our frontend
# Check if we have the original sklearn column names or the renamed ones
if 'mean radius' in data.columns:
    # Original sklearn column names
    mean_features = [
        'mean radius', 'mean texture', 'mean perimeter', 'mean area',
        'mean smoothness', 'mean compactness', 'mean concavity',
        'mean concave points', 'mean symmetry', 'mean fractal dimension'
    ]
    feature_mapping = {
        'mean radius': 'mean_radius',
        'mean texture': 'mean_texture', 
        'mean perimeter': 'mean_perimeter',
        'mean area': 'mean_area',
        'mean smoothness': 'mean_smoothness',
        'mean compactness': 'mean_compactness',
        'mean concavity': 'mean_concavity',
        'mean concave points': 'mean_concave_points',
        'mean symmetry': 'mean_symmetry',
        'mean fractal dimension': 'mean_fractal_dimension'
    }
    X = data[mean_features].rename(columns=feature_mapping)
else:
    # Already renamed columns
    mean_features = [
        'mean_radius', 'mean_texture', 'mean_perimeter', 'mean_area',
        'mean_smoothness', 'mean_compactness', 'mean_concavity',
        'mean_concave_points', 'mean_symmetry', 'mean_fractal_dimension'
    ]
    X = data[mean_features]
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
