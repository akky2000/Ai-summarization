import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300);
  const { state } = useLocation();
  const navigate = useNavigate();

  // start countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // read email from localStorage or navigation state
  const email = localStorage.getItem("email") || state?.email || "";

  const handleVerify = async () => {
    const code = otp.join("");
    try {
      await axios.post("http://localhost:3000/api/v1/email-verify", {
        email,
        otp: code,
      });
      toast.success("✅ Email verified! Redirecting to login…", {
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/resend-otp", {
        email,
      });
      setTimer(300);
      toast.info("🔄 OTP resent. Check your inbox.", { autoClose: 2000 });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/, "");
                const newOtp = [...otp];
                newOtp[idx] = val;
                setOtp(newOtp);
                if (val && idx < 5) {
                  document.getElementById(`otp-${idx + 1}`)?.focus();
                }
              }}
              className="w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.some((d) => d === "")}
          className="w-full py-3 mb-4 bg-gradient-to-r from-blue-800 to-purple-700 hover:from-blue-900 hover:to-purple-800 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify Account
        </button>

        <div className="text-center text-sm text-gray-600">
          <div className="mb-2">
            {Math.floor(timer / 60)
              .toString()
              .padStart(1, "0")}
            :{(timer % 60).toString().padStart(2, "0")}
          </div>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`font-medium transition-colors ${
              timer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
