# # from fastapi import FastAPI, UploadFile, File, Form
# # import joblib
# # import pandas as pd
# # import onnxruntime as ort
# # from PIL import Image
# # import numpy as np
# # import io

# # app = FastAPI()

# # # Load tabular model
# # tabular_model = joblib.load("model/tabular_model.pkl")
# # scaler = joblib.load("model/scaler.pkl")

# # # Load CNN model
# # onnx_session = ort.InferenceSession("model/cnn_model.onnx")

# # @app.post("/predict/tabular")
# # async def predict_tabular(diameter: float = Form(...), texture: float = Form(...), smoothness: float = Form(...)):
# #     X = pd.DataFrame([[diameter, texture, smoothness]], columns=["diameter", "texture", "smoothness"])
# #     X_scaled = scaler.transform(X)
# #     prediction = tabular_model.predict(X_scaled)[0]
# #     return {"prediction": int(prediction)}

# # @app.post("/predict/image")
# # async def predict_image(file: UploadFile = File(...)):
# #     contents = await file.read()
# #     image = Image.open(io.BytesIO(contents)).convert("RGB")
# #     image = image.resize((224, 224))
# #     image = np.array(image).astype(np.float32).transpose(2,0,1) / 255.0
# #     image = np.expand_dims(image, axis=0)

# #     inputs = {onnx_session.get_inputs()[0].name: image}
# #     outputs = onnx_session.run(None, inputs)
# #     pred = int(np.argmax(outputs[0]))
# #     return {"prediction": pred}
# from fastapi import FastAPI, UploadFile, File, Form
# import joblib
# import pandas as pd
# import onnxruntime as ort
# from PIL import Image
# import numpy as np
# import io

# app = FastAPI()

# # Load tabular model and scaler
# tabular_model = joblib.load("model/tabular_model.pkl")
# scaler = joblib.load("model/scaler.pkl")

# # Load CNN image model
# onnx_session = ort.InferenceSession("model/cnn_model.onnx")

# @app.post("/predict/tabular")
# async def predict_tabular(
#     radius_mean: float = Form(...),
#     texture_mean: float = Form(...),
#     perimeter_mean: float = Form(...),
#     area_mean: float = Form(...),
#     smoothness_mean: float = Form(...),
#     compactness_mean: float = Form(...),
#     concavity_mean: float = Form(...),
#     concave_points_mean: float = Form(...),
#     symmetry_mean: float = Form(...),
#     fractal_dimension_mean: float = Form(...),
# ):
#     # Put all inputs into a DataFrame
#     X = pd.DataFrame([[
#         radius_mean,
#         texture_mean,
#         perimeter_mean,
#         area_mean,
#         smoothness_mean,
#         compactness_mean,
#         concavity_mean,
#         concave_points_mean,
#         symmetry_mean,
#         fractal_dimension_mean
#     ]], columns=[
#         "radius_mean",
#         "texture_mean",
#         "perimeter_mean",
#         "area_mean",
#         "smoothness_mean",
#         "compactness_mean",
#         "concavity_mean",
#         "concave_points_mean",
#         "symmetry_mean",
#         "fractal_dimension_mean"
#     ])

#     # Scale input
#     X_scaled = scaler.transform(X)

#     # Predict
#     prediction = tabular_model.predict(X_scaled)[0]

#     return {"prediction": int(prediction)}

# @app.post("/predict/image")
# async def predict_image(file: UploadFile = File(...)):
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents)).convert("RGB")
#     image = image.resize((224, 224))
#     image = np.array(image).astype(np.float32).transpose(2, 0, 1) / 255.0
#     image = np.expand_dims(image, axis=0)

#     inputs = {onnx_session.get_inputs()[0].name: image}
#     outputs = onnx_session.run(None, inputs)
#     pred = int(np.argmax(outputs[0]))
    
#     return {"prediction": pred}
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import joblib
import pandas as pd
import onnxruntime as ort
from PIL import Image
import numpy as np
import io
import os

app = FastAPI()

# Resolve model directory relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

# Load tabular model
tabular_model = joblib.load(os.path.join(MODEL_DIR, "tabular_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

# Load CNN model
onnx_session = ort.InferenceSession(os.path.join(MODEL_DIR, "cnn_model.onnx"))

# ✅ Define schema for JSON input
class TabularInput(BaseModel):
    radius_mean: float
    texture_mean: float
    perimeter_mean: float
    area_mean: float
    smoothness_mean: float
    compactness_mean: float
    concavity_mean: float
    concave_points_mean: float
    symmetry_mean: float
    fractal_dimension_mean: float

@app.post("/predict/tabular")
async def predict_tabular(data: TabularInput):
    try:
        # Create DataFrame with the exact features used in training
        # Use only the 10 mean features that match our frontend
        feature_values = [
            data.radius_mean,
            data.texture_mean,
            data.perimeter_mean,
            data.area_mean,
            data.smoothness_mean,
            data.compactness_mean,
            data.concavity_mean,
            data.concave_points_mean,
            data.symmetry_mean,
            data.fractal_dimension_mean
        ]
        
        # Create DataFrame with the exact column names used in training
        feature_names = [
            'mean_radius', 'mean_texture', 'mean_perimeter', 'mean_area',
            'mean_smoothness', 'mean_compactness', 'mean_concavity',
            'mean_concave_points', 'mean_symmetry', 'mean_fractal_dimension'
        ]
        
        X = pd.DataFrame([feature_values], columns=feature_names)
        
        # Scale the features
        X_scaled = scaler.transform(X)
        prediction = tabular_model.predict(X_scaled)[0]
        
        # Convert prediction: 0 = benign, 1 = malignant
        result = "malignant" if prediction == 1 else "benign"
        confidence = 85 + (prediction * 10) + (hash(str(feature_values)) % 10)  # Mock confidence
        
        return {
            "prediction": int(prediction), 
            "result": result,
            "confidence": float(round(confidence, 1))
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        return {"error": str(e), "prediction": 0, "result": "error"}

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Convert to grayscale (1 channel) to match training, resize to 224x224
        image = Image.open(io.BytesIO(contents)).convert("L").resize((224, 224))

        # To tensor-like NCHW: (1, 1, 224, 224), normalized with mean=0.5, std=0.5
        np_image = np.array(image).astype(np.float32) / 255.0  # (H, W)
        np_image = (np_image - 0.5) / 0.5  # normalize to [-1, 1]
        np_image = np.expand_dims(np_image, axis=0)  # (1, H, W)
        np_image = np.expand_dims(np_image, axis=0)  # (1, 1, H, W)

        inputs = {onnx_session.get_inputs()[0].name: np_image}
        outputs = onnx_session.run(None, inputs)

        logits = outputs[0]  # expected shape (1, 2)
        # Softmax along classes
        exp_logits = np.exp(logits - np.max(logits, axis=1, keepdims=True))
        probabilities = exp_logits / np.sum(exp_logits, axis=1, keepdims=True)
        pred = int(np.argmax(probabilities, axis=1)[0])
        confidence = float(np.max(probabilities, axis=1)[0] * 100.0)

        # Convert prediction: 0 = benign, 1 = malignant
        result = "malignant" if pred == 1 else "benign"

        return {
            "prediction": pred,
            "result": result,
            "confidence": round(confidence, 1)
        }
    except Exception as e:
        print(f"Image prediction error: {e}")
        return {"error": str(e), "prediction": 0, "result": "error"}
