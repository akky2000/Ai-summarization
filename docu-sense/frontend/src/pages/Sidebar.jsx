import React, { useState } from "react";
import { FileText, Upload, Search, Layers, Settings, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: <FileText size={18} />, label: "Dashboard", to: "/dashboard" },
  { icon: <Upload size={18} />, label: "My Documents", to: "/documents" },
  { icon: <Search size={18} />, label: "Smart Search", to: "/search" },
  { icon: <Layers size={18} />, label: "Summarizer", to: "/summarizer" },
  { icon: <Settings size={18} />, label: "Settings", to: "/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Toggle Button for Mobile & Desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-md shadow-md focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-sm transition-width duration-300 ease-in-out z-40 ${isOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <Menu className={`text-blue-700 ${isOpen ? 'mr-2' : ''}`} />
          {isOpen && <span className="text-xl font-semibold text-gray-800">DocuSense</span>}
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex items-center p-2 mx-3 my-1 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {isOpen && <span className="ml-4 text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when closed on mobile */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setIsOpen(true)}
        />
      )}

      {/* Main Content Placeholder */}
      <div
        className={`flex-1 transition-all duration-300 ml-16 ${isOpen ? 'md:ml-64' : 'md:ml-16'}`}
      >
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
