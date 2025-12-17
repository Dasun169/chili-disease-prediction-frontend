import os
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
import pandas as pd
import joblib # For loading XGBoost model artifacts
from PIL import Image
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# --- CONFIGURATION & MODEL LOADING (STAGE 1: IMAGE CLASSIFICATION) ---
CNN_MODEL_PATH = 'chili_disease_base_cnn_model.h5' 
CNN_CLASS_NAMES = ['anthracnose', 'nutrient_deficiency', 'others'] 
IMG_SIZE = (150, 150)

# --- CONFIGURATION & MODEL LOADING (STAGE 2: XGBOOST NUTRIENT PREDICTION) ---
XGB_MODEL_FILE = 'nutrient_deficiency_model_best_xgb.joblib'
FEATURES_FILE = 'model_features_xgb.joblib'
ENCODER_FILE = 'label_encoder.joblib'

# Initialize models and artifacts
cnn_model = None
xgb_model = None
xgb_feature_columns = None
label_encoder = None

try:
    # Load Stage 1 CNN Model
    cnn_model = keras.models.load_model(CNN_MODEL_PATH)
    print("Stage 1 (CNN) Model loaded successfully.")
except Exception as e:
    print(f"Error loading Stage 1 CNN model: {e}")

try:
    # Load Stage 2 XGBoost Model and artifacts
    xgb_model = joblib.load(XGB_MODEL_FILE)
    xgb_feature_columns = joblib.load(FEATURES_FILE)
    label_encoder = joblib.load(ENCODER_FILE)
    print("Stage 2 (XGBoost) Model artifacts loaded successfully.")
except Exception as e:
    print(f"Error loading Stage 2 XGBoost model artifacts: {e}")


# --- IMAGE PREPROCESSING FUNCTION ---
def preprocess_image(image_bytes):
    """Loads image bytes, resizes it, converts to array, and normalizes."""
    img = Image.open(BytesIO(image_bytes))
    img = img.resize(IMG_SIZE)
    img_array = np.array(img)
    
    # Ensure 3 color channels
    if img_array.ndim == 2:
        img_array = np.stack((img_array,)*3, axis=-1)
    elif img_array.shape[2] == 4:
        img_array = img_array[:, :, :3]
    
    img_array = img_array.astype('float32') / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

# --- STAGE 1: IMAGE PREDICTION ENDPOINT ---
@app.route('/predict', methods=['POST'])
def predict_image_disease():
    if cnn_model is None:
        return jsonify({"error": "Stage 1 Model not loaded"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    
    if image_file:
        try:
            image_bytes = image_file.read()
            processed_image = preprocess_image(image_bytes)
            
            predictions = cnn_model.predict(processed_image)
            
            predicted_class_index = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_index]) * 100
            predicted_class_name = CNN_CLASS_NAMES[predicted_class_index]

            # --- Recommendation/Severity Logic ---
            severity = "N/A"
            recommendation = "Maintain optimal conditions."
            if predicted_class_name == 'nutrient_deficiency':
                severity = "Medium" 
                recommendation = "Potential nutrient problem detected. Click the new button to determine the exact chemical element."
            elif predicted_class_name == 'anthracnose':
                severity = "High"
                recommendation = "Apply recommended fungicide and remove infected plant parts."
            
            response = {
                "disease": predicted_class_name,
                "confidence": round(confidence, 2),
                "severity": severity,
                "recommendation": recommendation,
            }
            
            return jsonify(response)

        except Exception as e:
            print(f"Stage 1 Prediction error: {e}")
            return jsonify({"error": f"An error occurred during image prediction: {str(e)}"}), 500

# --- STAGE 2: NUTRIENT ELEMENT PREDICTION ENDPOINT ---
@app.route('/predict-nutrient-element', methods=['POST'])
def predict_nutrient_element():
    if xgb_model is None:
        return jsonify({"error": "Stage 2 Model not loaded"}), 500
        
    # Expects JSON data from the frontend form
    raw_input_data = request.get_json(silent=True)
    if not raw_input_data:
        return jsonify({"error": "Invalid or missing JSON input data"}), 400

    try:
        # 1. Convert raw input data (8 columns) to DataFrame
        input_df = pd.DataFrame([raw_input_data])

        # 2. Apply One-Hot Encoding (OHE) on categorical features
        categorical_features = ['Soil_type', 'Leaf_color']
        input_df = pd.get_dummies(input_df, columns=categorical_features)

        # 3. Re-index to match the 10 training features, filling missing OHE columns with 0
        final_input = input_df.reindex(columns=xgb_feature_columns, fill_value=0)

        # 4. Make the prediction (returns an encoded integer: 0, 1, or 2)
        predicted_encoded = xgb_model.predict(final_input)[0]

        # 5. Inverse transform to get the original label ('K', 'N', or 'P')
        predicted_element = label_encoder.inverse_transform([predicted_encoded])[0]

        # 6. Prepare final response
        element_map = {'N': 'Nitrogen Deficiency', 'P': 'Phosphorus Deficiency', 'K': 'Potassium Deficiency'}
        
        return jsonify({
            "chemical_element_code": predicted_element,
            "deficiency_name": element_map.get(predicted_element, "Unknown Deficiency"),
            "full_recommendation": f"Based on your farm data, the most probable deficiency is {element_map.get(predicted_element, 'Unknown Deficiency')}."
        })

    except Exception as e:
        print(f"Stage 2 Prediction error: {e}")
        return jsonify({"error": f"An error occurred during nutrient prediction: {str(e)}"}), 500


if __name__ == '__main__':
    # Flask will now be running and listening for requests
    app.run(host='0.0.0.0', port=5000, debug=True) # debug=True is helpful for development