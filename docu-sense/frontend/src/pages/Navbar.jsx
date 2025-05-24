import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Search, X, LayoutDashboard, Files, Settings, User } from "lucide-react";
import { Input } from "../components/ui/input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
const handleLogout = () => {
  dispatch(logout()); // your Redux logout action
  navigate("/");      // redirect to landing page
};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 shadow-sm fixed w-full z-30 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Menu size={24} />
              <span className="text-xs font-medium">Menu</span>
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Files className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DocSense
              </h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                className="pl-10 w-full rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 transition-colors"
              >
                <img
                  src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                  <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 gap-2"
                    >
                      <User size={16} className="text-gray-500" />
                      Profile
                    </Link>
                                    <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 gap-2"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  


                  
                  <Link to="/">
                  <button
                    onClick={() => {/* logout logic */}}
                    className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 gap-2"
                  >
                    <X size={16} />
                    Logout
                  </button>
                  </Link>

                  
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar with Close Button */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />
          <div ref={sidebarRef} className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-40 transition-transform">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              
              <Link
                to="/upload-document"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <Files size={18} />
                Upload Documents
              </Link>
              <Link
                to="/all-document"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <Files size={18} />
                All Documents
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings size={18} />
                Settings
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile Menu */}
     {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="fixed top-16 inset-x-0 bg-white border-t border-gray-200 md:hidden z-30">
    <div className="p-4 space-y-2">
      <Link
        to="/dashboard"
        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
        onClick={() => setMobileMenuOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        to="/upload-document"
        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
        onClick={() => setMobileMenuOpen(false)}
      >
        Upload Documents
      </Link>
      <Link
        to="/all-document"
        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
        onClick={() => setMobileMenuOpen(false)}
      >
        All Documents
      </Link>
      <Link
        to="/settings"
        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
        onClick={() => setMobileMenuOpen(false)}
      >
        Settings
      </Link>
    </div>
  </div>
)}
    </>
  );
}