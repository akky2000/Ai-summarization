import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";


axios.defaults.withCredentials = true; // <-- send/receive httpOnly cookie


export default function LoginPage() {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const navigate                   = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        { email, password },
        { withCredentials: true }
      );

      // backend returns { status: true/false, message, user: { … } }
      if (response.data.status) {
        // Optionally store user info in localStorage or Redux here:
        dispatch(setUser(response.data.user) )


        toast.success("🎉 Login successful! Redirecting…", {
          autoClose: 2000,
          onClose: () => navigate("/Dashboard"),
        });
      } else {
        toast.error(response.data.message || "⚠️ Invalid credentials");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "🚨 Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <ToastContainer position="top-center" />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
          >
            {loading ? <BeatLoader size={10} /> : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
