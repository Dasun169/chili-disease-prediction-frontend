import { motion } from "framer-motion";
import {
  Leaf,
  Target,
  Lightbulb,
  Award,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Leaf className="w-16 h-16 mx-auto text-primary-600 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          About This Project
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI-powered solution for early detection and management of chili leaf
          diseases
        </p>
      </motion.div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Project Overview
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Chili Leaf Disease Prediction System is an advanced web
          application designed to help farmers and agricultural professionals
          identify diseases in chili plants quickly and accurately. Using
          state-of-the-art machine learning models, this system analyzes leaf
          images and provides instant disease predictions along with treatment
          recommendations.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This project addresses the critical need for early disease detection
          in agriculture, potentially saving crops and improving yields. The
          system is designed to be user-friendly, accessible, and accurate,
          making advanced agricultural technology available to everyone.
        </p>
      </motion.div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: Target,
            title: "High Accuracy",
            description:
              "Machine learning models trained on thousands of images for reliable predictions",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: Lightbulb,
            title: "Smart Analysis",
            description:
              "Intelligent disease detection with confidence scores and severity assessment",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: Award,
            title: "Research-Based",
            description:
              "Built on scientific research and validated agricultural practices",
            color: "from-purple-500 to-purple-600",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Research Purpose */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 mb-8 border border-primary-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Research Purpose
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This research project aims to bridge the gap between advanced AI
          technology and practical agricultural applications. By developing an
          accessible web-based platform, we're making cutting-edge disease
          detection technology available to farmers, agronomists, and
          agricultural students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Primary Goals</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Early disease detection and prevention</li>
              <li>• Reduce crop losses through timely intervention</li>
              <li>• Provide actionable insights to farmers</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Technical Objectives
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Achieve 95%+ prediction accuracy</li>
              <li>• Real-time image processing</li>
              <li>• User-friendly interface design</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Developer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-bold text-white">DN</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Dasun Navindu Dewnith
            </h2>
            <p className="text-primary-600 font-medium mb-3">
              Undergraduate Full-Stack Developer
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Passionate about leveraging technology to solve real-world
              problems. Specializing in web development, machine learning, and
              agricultural technology. This project combines my interests in
              software engineering and sustainable agriculture to create
              meaningful impact.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-8 bg-gray-800 rounded-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React.js",
            "Tailwind CSS",
            "Framer Motion",
            "Machine Learning",
            "Python",
            "TensorFlow",
            "Node.js",
            "REST API",
          ].map((tech, index) => (
            <div
              key={tech}
              className="bg-gray-700 rounded-lg p-3 text-center font-medium text-sm hover:bg-gray-600 transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
