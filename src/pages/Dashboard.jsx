import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ScanLine,
  BookOpen,
  History,
  TrendingUp,
  Activity,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Total Scans", value: "24", icon: Activity, color: "bg-blue-500" },
    {
      label: "Diseases Detected",
      value: "8",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "Healthy Scans",
      value: "16",
      icon: CheckCircle,
      color: "bg-blue-500",
    },
    { label: "This Month", value: "12", icon: History, color: "bg-blue-500" },
  ];

  const quickActions = [
    {
      title: "Predict Disease",
      description: "Upload an image to detect diseases",
      icon: ScanLine,
      color: "from-blue-500 to-blue-700",
      path: "/predict",
    },
    {
      title: "Disease Info",
      description: "Learn about common chili diseases",
      icon: BookOpen,
      color: "from-blue-500 to-blue-700",
      path: "/disease-info",
    },
    {
      title: "View History",
      description: "Check your past predictions",
      icon: History,
      color: "from-blue-500 to-blue-700",
      path: "/history",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's an overview of your disease detection activity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={action.title} to={action.path}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white shadow-lg cursor-pointer`}
              >
                <action.icon className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Predictions
        </h2>
        <div className="space-y-4">
          {[
            {
              disease: "Bacterial Spot",
              date: "2 hours ago",
              status: "Detected",
            },
            { disease: "Healthy Leaf", date: "1 day ago", status: "Healthy" },
            { disease: "Leaf Curl", date: "2 days ago", status: "Detected" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "Healthy"
                      ? "bg-primary-500"
                      : "bg-accent-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-800">{item.disease}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  item.status === "Healthy"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-accent-100 text-accent-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
