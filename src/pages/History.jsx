import { motion } from "framer-motion";
import { Calendar, TrendingUp, Download } from "lucide-react";

const History = () => {
  const historyData = [
    {
      id: 1,
      date: "2024-11-21",
      disease: "Bacterial Spot",
      confidence: 92.5,
      status: "Detected",
    },
    {
      id: 2,
      date: "2024-11-20",
      disease: "Healthy Leaf",
      confidence: 98.2,
      status: "Healthy",
    },
    {
      id: 3,
      date: "2024-11-19",
      disease: "Leaf Curl",
      confidence: 87.3,
      status: "Detected",
    },
    {
      id: 4,
      date: "2024-11-18",
      disease: "Powdery Mildew",
      confidence: 91.8,
      status: "Detected",
    },
    {
      id: 5,
      date: "2024-11-17",
      disease: "Healthy Leaf",
      confidence: 96.5,
      status: "Healthy",
    },
    {
      id: 6,
      date: "2024-11-16",
      disease: "Anthracnose",
      confidence: 89.2,
      status: "Detected",
    },
    {
      id: 7,
      date: "2024-11-15",
      disease: "Healthy Leaf",
      confidence: 97.8,
      status: "Healthy",
    },
    {
      id: 8,
      date: "2024-11-14",
      disease: "Mosaic Virus",
      confidence: 93.1,
      status: "Detected",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Prediction History
        </h1>
        <p className="text-gray-600">
          View all your past disease predictions and analysis
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-200 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Predictions</p>
              <p className="text-2xl font-bold text-gray-800">
                {historyData.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-200 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-200 p-3 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg Confidence</p>
              <p className="text-2xl font-bold text-gray-800">93.2%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Disease
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historyData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    #{item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {item.disease}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600">{item.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Healthy"
                          ? "bg-primary-100 text-primary-700"
                          : "bg-accent-100 text-accent-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default History;
