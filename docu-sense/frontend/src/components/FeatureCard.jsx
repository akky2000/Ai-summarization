import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition text-left"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </motion.div>
  );
}
