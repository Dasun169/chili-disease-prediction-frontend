import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";

// --- NEW COMPONENT: Survey Modal (You can place this in a separate file too) ---
// --- NEW COMPONENT: Styled Survey Modal ---
const NutrientSurveyModal = ({ onClose, onPredictionSuccess }) => {
    // ... (surveyData, loading, error states and handleChange function remain the same)
    const [surveyData, setSurveyData] = useState({
        DAP_TSP: 1, 
        MOP: 1,
        Urea_1st: 1,
        Urea_2nd: 0,
        Urea_3rd: 0,
        Soil_type: 2, 
        Last_month_watering: 1,
        Leaf_color: 1, 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSurveyData(prev => ({
            ...prev,
            [name]: parseInt(value, 10),
        }));
    };
    
    // ... (handleSubmit function remains the same, assuming it works)
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://dasunnavindu-chili-disease-backend.hf.space/predict-nutrient-element", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(surveyData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            onPredictionSuccess(result); 

        } catch (error) {
            console.error("Nutrient prediction failed:", error);
            setError(`Prediction failed: ${error.message}`);
        } finally {
            setLoading(false);
            onClose(); 
        }
    };


    // Helper data for rendering dropdowns
    const soilOptions = [
        { value: 1, label: '1 - Sandy/Light soil' },
        { value: 2, label: '2 - Loamy/Medium soil' },
        { value: 3, label: '3 - Clay/Heavy soil' },
    ];

    const leafOptions = [
        { value: 1, label: '1 - Yellow-green' },
        { value: 2, label: '2 - Purple-tinged / Blue-gray' },
        { value: 3, label: '3 - Green w/ brown mixed yellow' },
    ];

    const binaryOptions = [
        { value: 1, label: '1 = Applied / Yes' },
        { value: 0, label: '0 = Not Applied / No' },
    ];

    // --- REVISED JSX FOR STYLING ---
    return (
        // Modal Container with BLUR effect
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"> {/* Use z-[100] for maximum stacking priority */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 space-y-6 transform transition-all duration-300"
            >
                <h3 className="text-3xl font-extrabold text-gray-900 border-b border-gray-200 pb-3">
                    Nutrient Deficiency Analysis
                </h3>
                
                <p className="text-gray-600 font-medium text-lg">
                    Please provide the following data for a precise element prediction:
                </p>
                
                {/* Survey Form Scrollable Area */}
                <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-3 custom-scrollbar">
                    
                    {/* Input Group: Fertilizer & Watering */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4">
                        <h4 className="text-xl font-semibold text-gray-800 col-span-full">Fertilizer & Water Application</h4>
                        
                        {/* Fertilizer Questions (Binary) */}
                        {[
                            { name: "DAP_TSP", question: "DAP/TSP basal dressing?" },
                            { name: "MOP", question: "MOP (Potash) basal dressing?" },
                            { name: "Urea_1st", question: "Urea 1st top dressing (30 days)?" },
                            { name: "Urea_2nd", question: "Urea 2nd top dressing (60-90 days)?" },
                            { name: "Urea_3rd", question: "Urea 3rd top dressing (flowering)?" },
                            { name: "Last_month_watering", question: "Watered in the last month?" },
                        ].map(({ name, question }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{question}</label>
                                <select
                                    name={name}
                                    value={surveyData[name]}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 transition-shadow text-base"
                                >
                                    {binaryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Input Group: Soil and Visual */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <h4 className="text-xl font-semibold text-gray-800 col-span-full">Soil Type & Visual Symptoms</h4>

                        {/* Soil Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Soil Type?</label>
                            <select
                                name="Soil_type"
                                value={surveyData.Soil_type}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 transition-shadow text-base"
                            >
                                {soilOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Leaf Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Leaf Color Noticed?</label>
                            <select
                                name="Leaf_color"
                                value={surveyData.Leaf_color}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 transition-shadow text-base"
                            >
                                {leafOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Buttons and Error */}
                {error && (
                    <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="w-5 h-5"/> {error}
                    </div>
                )}
                
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-base font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors shadow-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 text-base font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Analyzing Data..." : "Determine Element"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
// --- END REVISED COMPONENT ---
// --- END NEW COMPONENT ---


const PredictDisease = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false); // New state for modal

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setPrediction(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) return;
  
    setLoading(true);
    setPrediction(null); // Clear previous prediction
  
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    try {
      const response = await fetch("https://dasunnavindu-chili-disease-backend.hf.space/predict", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      setPrediction({
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        recommendation: result.recommendation,
        // New state to manage the two-stage process
        stage: 1, 
        element_result: null // To store the Stage 2 result
      });
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction({
        disease: "Prediction Failed",
        confidence: 0,
        severity: "Error",
        recommendation: `Could not connect to the prediction server. Error: ${error.message}`,
        stage: 0,
        element_result: null
      });
    } finally {
      setLoading(false);
    }
  };  

  // New handler for the Stage 2 prediction result from the modal
  const handleElementPredictionSuccess = (result) => {
    // Update the prediction state with the Stage 2 results
    setPrediction(prev => ({
        ...prev,
        stage: 2, // Mark as stage 2 complete
        element_result: result, // Store the element result
        recommendation: result.full_recommendation // Update recommendation
    }));
  }

  const clearImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setPrediction(null);
    setShowSurveyModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Predict Chili Leaf Disease
        </h1>
        <p className="text-gray-600">
          Upload an image of a chili leaf to detect potential diseases
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section (No Changes Needed Here) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Image</h2>
            {/* ... rest of the upload logic ... */}
            
            {/* Paste the upload/preview section from your original code here */}
            {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drop your image here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports: JPG, PNG, JPEG
                </p>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg shadow-md"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
            
          {preview && prediction?.stage !== 2 && ( /* Only show Predict button if not already in Stage 2 */
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handlePredict}
              disabled={loading}
              className="w-full mt-6 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Predict Disease"}
            </motion.button>
          )}
        </motion.div>

        {/* Result Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Prediction Result
          </h2>

          {!prediction ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <ImageIcon className="w-20 h-20 mb-4" />
              <p>Upload an image to see prediction results</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* --- STAGE 1 OUTPUT --- */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-200">
                <p className="text-sm text-gray-600 mb-1">Detected Disease</p>
                <p className="text-2xl font-bold text-primary-700">
                  {prediction.disease}
                </p>
                 {prediction.element_result && (
                     <p className="text-lg font-semibold text-green-700 mt-1">
                         Element: {prediction.element_result.deficiency_name}
                     </p>
                 )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Confidence</p>
                  <p className="text-xl font-bold text-gray-800">
                    {prediction.confidence}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Severity</p>
                  <p className="text-xl font-bold text-gray-800">
                    {prediction.severity}
                  </p>
                </div>
              </div>
                
                {/* --- NEW BUTTON: Only show if Stage 1 result is 'nutrient_deficiency' and Stage 2 has not run --- */}
                {prediction.disease === 'nutrient_deficiency' && prediction.stage === 1 && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setShowSurveyModal(true)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md mt-4"
                    >
                        🔬 Determine Exact Chemical Element
                    </motion.button>
                )}
                
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 mb-1">
                      Recommendation
                    </p>
                    <p className="text-sm text-yellow-700">
                      {prediction.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={clearImage}
                className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Analyze Another Image
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Render the modal if state is true */}
      {showSurveyModal && (
          <NutrientSurveyModal 
              onClose={() => setShowSurveyModal(false)}
              onPredictionSuccess={handleElementPredictionSuccess}
          />
      )}
      
    </div>
  );
};

export default PredictDisease;