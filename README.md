# 🩺 Breast Cancer Detection (Next.js + FastAPI)

An **AI-powered Breast Cancer Detection System** combining a **Next.js frontend** with a **Python FastAPI backend**.  
Supports both **tabular data** and **image-based** predictions.

---

## 🚀 Features
- 🧪 ML Models for:
  - **Tabular dataset (numeric medical features)**
  - **Image dataset (cell images)**
- 🌐 Next.js frontend with modern UI
- ⚡ FastAPI backend for inference
- 📊 Interactive dashboard & results history
- 🔄 REST API endpoints for prediction
- 🎨 Styled with Tailwind CSS

---

## 🛠 Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS, Axios
- **Backend:** FastAPI (Python), Uvicorn
- **Machine Learning:** Scikit-learn, TensorFlow / PyTorch (if image model), Pandas, NumPy

---

## 📂 Project Structure
```

Breast-Cancer-Detection/
├── app/                 # Next.js app router
│   ├── api/             # API routes (proxy to backend)
│   ├── dashboard/       # Dashboard page
│   ├── predict/         # Prediction form
│   ├── results/         # Results page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Helper functions
│
├── mi-backend/          # FastAPI backend
│   ├── server.py        # Main FastAPI app
│   ├── train\_tabular.py # Script to train tabular ML model
│   ├── train\_image.py   # Script to train image model
│   ├── requirements.txt # Python dependencies
│   ├── dataset/         # Training dataset
│   │   └── images/
│   └── models/          # Saved ML models (.pkl / .h5)
│
├── node\_modules/
├── package.json         # Frontend dependencies
└── README.md

````

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/Breast-Cancer-Detection.git
````
```bash
cd Breast-Cancer-Detection
````
---

### 2. Backend (FastAPI + Python)

1. Navigate to backend:

   ```bash
   cd mi-backend
   ```

2. Create virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate environment:

   * Windows:

     ```bash
     .\.venv\Scripts\activate
     ```
   * Linux/Mac:

     ```bash
     source .venv/bin/activate
     ```

4. Install requirements:

   ```bash
   pip install -r requirements.txt
   ```

5. Start server:

   ```bash
   .\.venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
   ```

   Runs at → [http://127.0.0.1:8000](http://127.0.0.1:8000)
   Docs at → [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 3. Frontend (Next.js)

1. Go back to root:

   ```bash
   cd ..
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run frontend:

   ```bash
   npm run dev
   ```

   App runs at → [http://localhost:3000](http://localhost:3000)

---

## 🔧 API Endpoints

### Tabular Prediction

`POST /predict/tabular`

```json
{
  "mean_radius": 14.5,
  "mean_texture": 20.5,
  "mean_smoothness": 0.10
}
```

Response:

```json
{
  "prediction": "benign",
  "confidence": 91.2
}
```

### Image Prediction

`POST /predict/image` (multipart/form-data with image upload)
Response:

```json
{
  "prediction": "malignant",
  "confidence": 87.4
}
```

---

## 📝 Future Improvements

* ✅ Deployment with Docker (frontend + backend)
* ✅ Visualization of model explanations (SHAP, Grad-CAM)
* ✅ Export results to PDF

---

## 📜 License

MIT License © 2025
