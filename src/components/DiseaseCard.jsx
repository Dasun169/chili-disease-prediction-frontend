import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const DiseaseCard = ({ title, symptoms, severity, image }) => {
  const severityColors = {
    High: "bg-red-100 text-red-800 border-red-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <AlertCircle className="w-24 h-24 text-primary-600 opacity-50" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${severityColors[severity]}`}
          >
            {severity}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{symptoms}</p>
      </div>
    </motion.div>
  );
};

export default DiseaseCard;
