import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUser } from '../services/authService';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await verifyUser({ email, otp });
    if (response?.status) {
      setSuccess('Verification successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(response?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        <p className="text-sm text-gray-700 mb-2">OTP sent to: <strong>{email}</strong></p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 border"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Verify
        </button>
      </form>
    </div>
  );
}
