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

app = FastAPI()

# Load tabular model
tabular_model = joblib.load("model/tabular_model.pkl")
scaler = joblib.load("model/scaler.pkl")

# Load CNN model
onnx_session = ort.InferenceSession("model/cnn_model.onnx")

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
    # Convert input to DataFrame
    X = pd.DataFrame([data.dict().values()], columns=data.dict().keys())
    X_scaled = scaler.transform(X)
    prediction = tabular_model.predict(X_scaled)[0]
    return {"prediction": int(prediction)}

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image).astype(np.float32).transpose(2,0,1) / 255.0
    image = np.expand_dims(image, axis=0)

    inputs = {onnx_session.get_inputs()[0].name: image}
    outputs = onnx_session.run(None, inputs)
    pred = int(np.argmax(outputs[0]))
    return {"prediction": pred}
