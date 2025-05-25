// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   DocumentTextIcon,
//   MagnifyingGlassIcon as SearchIcon,
//   UserGroupIcon,
// } from '@heroicons/react/24/outline';

// export default function LandingPage() {
//   return (
//     <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow p-4 flex justify-between items-center px-6">
//         <h1 className="text-2xl font-bold text-blue-700">DocuSense</h1>
//         <div>
//           <Link
//             to="/login"
//             className="text-blue-600 hover:underline hover:text-blue-800 transition mr-4 text-sm sm:text-base"
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
//           >
//             Get Started
//           </Link>
//         </div>
//       </header>

//       {/* Main Section */}
//       <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
//           AI-Powered Smart Document Assistant
//         </h2>
//         <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
//           Organize, extract, search, and summarize documents using the power of AI – all in one platform.
//         </p>

//         {/* Image */}
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3262/3262879.png"
//           alt="DocuSense"
//           className="w-64 h-auto mb-10"
//         />

//         {/* Features */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10">
//           <FeatureCard
//             icon={<DocumentTextIcon className="w-10 h-10 text-blue-600" />}
//             title="Smart Classification"
//             desc="Automatically tag invoices, resumes, and more."
//           />
//           <FeatureCard
//             icon={<SearchIcon className="w-10 h-10 text-blue-600" />}
//             title="Semantic Search"
//             desc="Find documents based on meaning, not just words."
//           />
//           <FeatureCard
//             icon={<UserGroupIcon className="w-10 h-10 text-blue-600" />}
//             title="Role-Based Access"
//             desc="Secure document sharing with permission control."
//           />
//         </div>

//         {/* Call to Action */}
//         <Link
//           to="/register"
//           className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-lg shadow"
//         >
//           Start Using DocuSense
//         </Link>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 bg-white border-t text-sm text-gray-500">
//         © 2025 DocuSense. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition text-left">
//       <div className="mb-3">{icon}</div>
//       <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>
//       <p className="text-sm text-gray-600">{desc}</p>
//     </div>
//   );
// }








// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// // import FeatureCard from "../components/FeatureCard";
// import heroAnimation from "../assets/hero-animation.json";

// import {
//   DocumentTextIcon,
//   MagnifyingGlassIcon as SearchIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/outline";






// export default function LandingPage() {
//   const [darkMode, setDarkMode] = useState(true);

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
//         {/* Toggle Dark Mode */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="absolute top-5 right-52 bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded"
//         >
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>

//         {/* Header */}
//         <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center px-6">
//           <h1 className="text-2xl font-bold text-blue-700 dark:text-white">DocuSense</h1>
//           <div>
//             <Link
//               to="/login"
//               className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition mr-4 text-sm sm:text-base"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               onClick={() => {
//                 if (window.gtag) {
//                   window.gtag("event", "click", {
//                     event_category: "CTA",
//                     event_label: "Get Started Button",
//                   });
//                 }
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm sm:text-base"
//             >
//               Get Started
//             </Link>
//           </div>
//         </header>

//         {/* Main Section */}
//         <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
//             AI-Powered Smart Document Assistant
//           </h2>
//           <p className="text-2xl md:text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl">
//             Organize, extract, search, and summarize documents using the power of AI – all in one platform.
//           </p>

//           {/* Lottie Animation */}
//           <div className="w-64 h-64 mb-10">
//             <Lottie animationData={heroAnimation} loop={true} />
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10">
//             <FeatureCard
//               icon={<DocumentTextIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
//               title="Smart Classification"
//               desc="Automatically tag invoices, resumes, and more."
//             />
//             <FeatureCard
//               icon={<SearchIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
//               title="Semantic Search"
//               desc="Find documents based on meaning, not just words."
//             />
//             <FeatureCard
//               icon={<UserGroupIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
//               title="Role-Based Access"
//               desc="Secure document sharing with permission control."
//             />
//           </div>

//           {/* Call to Action */}
//           <Link
//             to="/register"
//             onClick={() => {
//               if (window.gtag) {
//                 window.gtag("event", "click", {
//                   event_category: "CTA",
//                   event_label: "Start Using DocuSense Button",
//                 });
//               }
//             }}
//             className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-green-700 transition text-lg shadow"
//           >
//             Start Using DocuSense
//           </Link>
//         </main>

//         {/* Testimonials */}
//         <section className="bg-white dark:bg-gray-900 py-10 px-6">
//           <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//             What Users Say
//           </h3>
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {[
//               { name: "Aarav", feedback: "This platform saved me hours of manual work!" },
//               { name: "Sara", feedback: "Incredible AI accuracy. Love the interface!" },
//               { name: "John", feedback: "Perfect for teams. Access control is a game changer." },
//             ].map((t, i) => (
//               <div
//                 key={i}
//                 className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl shadow text-sm"
//               >
//                 <p className="text-gray-700 dark:text-gray-200 mb-2">"{t.feedback}"</p>
//                 <span className="text-blue-600 dark:text-blue-400 font-medium">– {t.name}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="text-center p-4 bg-white dark:bg-gray-900 border-t text-sm text-gray-500 dark:text-gray-400">
//           © 2025 DocuSense. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, desc }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-md transition text-left"
//     >
//       <div className="mb-3">{icon}</div>
//       <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
//     </motion.div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero-animation.json";
import FeatureCard from "../components/FeatureCard";
import { useTheme } from "../context/ThemeContext";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon as SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  const { darkMode, setDarkMode } = useTheme(true);

  // For circular Lottie animation
  const angle = useMotionValue(0);
  const radius = 30;
  const x = useTransform(angle, (a) => radius * Math.cos(a));
  const y = useTransform(angle, (a) => radius * Math.sin(a));

  useEffect(() => {
    const controls = animate(angle, 2 * Math.PI, {
      repeat: Infinity,
      ease: "linear",
      duration: 5,
    });
    return controls.stop;
  }, [angle]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
        {/* Toggle Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-52 bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-white">DocuSense</h1>
          <div>
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition mr-4 text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => {
                if (window.gtag) {
                  window.gtag("event", "click", {
                    event_category: "CTA",
                    event_label: "Get Started Button",
                  });
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
            AI-Powered Smart Document Assistant
          </h2>
          <p className="text-2xl md:text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl">
            Organize, extract, search, and summarize documents using the power of AI – all in one platform.
          </p>

          {/* Lottie Animation Circle */}
          <motion.div className="w-64 h-64 mb-10" style={{ x, y }}>
            <Lottie animationData={heroAnimation} loop={true} />
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10">
            <FeatureCard
              icon={<DocumentTextIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
              title="Smart Classification"
              desc="Automatically tag invoices, resumes, and more."
            />
            <FeatureCard
              icon={<SearchIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
              title="Semantic Search"
              desc="Find documents based on meaning, not just words."
            />
            <FeatureCard
              icon={<UserGroupIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
              title="Role-Based Access"
              desc="Secure document sharing with permission control."
            />
          </div>

          {/* CTA */}
          <Link
            to="/register"
            onClick={() => {
              if (window.gtag) {
                window.gtag("event", "click", {
                  event_category: "CTA",
                  event_label: "Start Using DocuSense Button",
                });
              }
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-green-700 transition text-lg shadow"
          >
            Start Using DocuSense
          </Link>
        </main>

        {/* Testimonials */}
        <section className="bg-white dark:bg-gray-900 py-10 px-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            What Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Aarav", feedback: "This platform saved me hours of manual work!" },
              { name: "Sara", feedback: "Incredible AI accuracy. Love the interface!" },
              { name: "John", feedback: "Perfect for teams. Access control is a game changer." },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl shadow text-sm"
              >
                <p className="text-gray-700 dark:text-gray-200 mb-2">"{t.feedback}"</p>
                <span className="text-blue-600 dark:text-blue-400 font-medium">– {t.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-4 bg-white dark:bg-gray-900 border-t text-sm text-gray-500 dark:text-gray-400">
          © 2025 DocuSense. All rights reserved.
        </footer>
      </div>
    </div>
  );
}


