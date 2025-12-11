import os
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
from PIL import Image
from io import BytesIO
from flask_cors import CORS # Needed to allow your React frontend to communicate with the API

app = Flask(__name__)
# Enable CORS for all routes (important for frontend communication)
CORS(app) 

# --- CONFIGURATION ---
MODEL_PATH = 'chili_disease_mobilenet_model_new.h5' 
# NOTE: Replace with your actual class names in the correct order
CLASS_NAMES = ['anthracnose', 'nutrient_deficiency', 'others'] 
# MobileNetV2 input size
IMG_SIZE = (150, 150) 

# --- LOAD MODEL ---
try:
    # Load the trained Keras model
    model = keras.models.load_model(MODEL_PATH)
    print("MobileNetV2 Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# --- IMAGE PREPROCESSING FUNCTION ---
def preprocess_image(image_bytes):
    """Loads image bytes, resizes it, converts to array, and normalizes."""
    # Open the image from bytes
    img = Image.open(BytesIO(image_bytes))
    
    # Resize the image to the required input size for MobileNetV2
    img = img.resize(IMG_SIZE)
    
    # Convert image to a numpy array
    img_array = np.array(img)
    
    # Check if image has 3 color channels (RGB). Convert if it's grayscale or has an alpha channel
    if img_array.ndim == 2: # Grayscale
        img_array = np.stack((img_array,)*3, axis=-1)
    elif img_array.shape[2] == 4: # RGBA
        img_array = img_array[:, :, :3]
    
    # Normalize pixel values to [0, 1] as typically done for Keras models
    img_array = img_array.astype('float32') / 255.0
    
    # Add a batch dimension (1, 224, 224, 3)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

# --- PREDICTION ENDPOINT ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    
    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if image_file:
        try:
            # Read the image file into bytes
            image_bytes = image_file.read()
            
            # Preprocess the image
            processed_image = preprocess_image(image_bytes)
            
            # Make prediction
            predictions = model.predict(processed_image)
            
            # Get the predicted class index and confidence
            predicted_class_index = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_index]) * 100
            predicted_class_name = CLASS_NAMES[predicted_class_index]

            # --- Customize this logic based on your needs ---
            # Add simple severity/recommendation logic 
            if "Healthy" in predicted_class_name:
                severity = "N/A"
                recommendation = "Keep monitoring. Maintain optimal watering and nutrient levels."
            else:
                severity = "High" if confidence > 90 else "Medium"
                # This is a placeholder; you should have specific recommendations per disease
                recommendation = f"Consult a local agricultural expert for {predicted_class_name}. Immediate action is recommended." 
            # ------------------------------------------------
            
            response = {
                "disease": predicted_class_name,
                "confidence": round(confidence, 2),
                "severity": severity,
                "recommendation": recommendation,
            }
            
            return jsonify(response)

        except Exception as e:
            # Log the error for debugging purposes
            print(f"Prediction error: {e}")
            return jsonify({"error": f"An error occurred during prediction: {str(e)}"}), 500

if __name__ == '__main__':
    # You can change the port if needed
    app.run(host='0.0.0.0', port=5000)