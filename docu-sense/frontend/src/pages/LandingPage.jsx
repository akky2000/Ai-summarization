import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon as SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col mt-16">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-blue-700">DocuSense</h1>
        <div>
          <Link
            to="/login"
            className="text-blue-600 hover:underline hover:text-blue-800 transition mr-4 text-sm sm:text-base"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
          AI-Powered Smart Document Assistant
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Organize, extract, search, and summarize documents using the power of AI – all in one platform.
        </p>

        {/* Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3262/3262879.png"
          alt="DocuSense"
          className="w-64 h-auto mb-10"
        />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10">
          <FeatureCard
            icon={<DocumentTextIcon className="w-10 h-10 text-blue-600" />}
            title="Smart Classification"
            desc="Automatically tag invoices, resumes, and more."
          />
          <FeatureCard
            icon={<SearchIcon className="w-10 h-10 text-blue-600" />}
            title="Semantic Search"
            desc="Find documents based on meaning, not just words."
          />
          <FeatureCard
            icon={<UserGroupIcon className="w-10 h-10 text-blue-600" />}
            title="Role-Based Access"
            desc="Secure document sharing with permission control."
          />
        </div>

        {/* Call to Action */}
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-lg shadow"
        >
          Start Using DocuSense
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 bg-white border-t text-sm text-gray-500">
        © 2025 DocuSense. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition text-left">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
