import { motion } from "framer-motion";
import DiseaseCard from "../components/DiseaseCard";

const DiseaseInfo = () => {
  const diseases = [
    {
      title: "Bacterial Spot",
      symptoms:
        "Small, dark spots on leaves that may have a yellow halo. Spots can merge and cause leaf drop.",
      severity: "High",
    },
    {
      title: "Leaf Curl",
      symptoms:
        "Leaves curl upward or downward, often becoming distorted and stunted in growth.",
      severity: "Medium",
    },
    {
      title: "Powdery Mildew",
      symptoms:
        "White powdery coating on leaves, stems, and fruits. Leaves may yellow and drop.",
      severity: "Medium",
    },
    {
      title: "Anthracnose",
      symptoms:
        "Circular spots with dark edges on fruits and leaves. Can cause fruit rot.",
      severity: "High",
    },
    {
      title: "Mosaic Virus",
      symptoms:
        "Mottled yellow and green patterns on leaves. Stunted growth and distorted leaves.",
      severity: "High",
    },
    {
      title: "Root Rot",
      symptoms:
        "Wilting despite adequate water, yellowing leaves, and soft, brown roots.",
      severity: "High",
    },
    {
      title: "Cercospora Leaf Spot",
      symptoms:
        "Circular gray spots with dark borders. Can cause severe defoliation.",
      severity: "Medium",
    },
    {
      title: "Aphid Infestation",
      symptoms:
        "Small insects on undersides of leaves. Causes curling and yellowing of leaves.",
      severity: "Low",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chili Leaf Diseases
        </h1>
        <p className="text-gray-600">
          Learn about common diseases affecting chili plants and their symptoms
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease, index) => (
          <motion.div
            key={disease.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DiseaseCard {...disease} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseInfo;
