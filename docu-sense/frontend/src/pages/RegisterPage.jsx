// import React, { useState } from 'react';
// import { registerUser, verifyUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';
// import { BeatLoader } from 'react-spinners';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));


// export default function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  

//   const validatePassword = (pass) => {
//     const regex = /^(?=.*[A-Za-z]).{6,}$/;
//     return regex.test(pass);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await registerUser(formData);
//     if (response?.status) {
//       setOtpSent(true); // show OTP field
//       setError('');
//     } else {
//       setError(response?.message || 'Registration failed');
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     const response = await verifyUser({ email: formData.email, otp });
//     if (response?.status) {
//       setSuccessMessage('Verification successful. You can now log in.');
//       setError('');
//     } else {
//       setError(response?.message || 'OTP verification failed');
//     setLoading(true);

//     if (!validatePassword(password)) {
//       toast.error('Password must be at least 6 characters with at least one letter');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/register", {
//         name,
//         email,
//         phone,
//         password,
//       });

//       if (response.data.status) {
//         toast.success("🎉 Registration successful! Check your email for verification.", {
//           autoClose: 3000,
//           onClose: () => navigate('/email-verify'),
//         });

//         localStorage.setItem("email", email);

//       } else {
//         toast.error(response.data.message || "⚠️ Registration failed");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                          error.message || 
//                          "🚨 Registration failed. Please try again.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-4 text-center">{otpSent ? 'Verify OTP' : 'Register'}</h2>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         {successMessage && <p className="text-green-600 text-sm mb-2">{successMessage}</p>}

//         {!otpSent ? (
//           <>
//             <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-3 border" onChange={handleChange} required />
//             <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 border" onChange={handleChange} required />
//             <input type="text" name="phone" placeholder="Phone" className="w-full p-2 mb-3 border" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border" onChange={handleChange} required />
//             <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
//           </>
//         ) : (
//           <>
//             <p className="mb-3 text-sm text-gray-600">An OTP has been sent to your email/phone.</p>
//             <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 mb-4 border" required />
//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Verify OTP</button>
//           </>
//         )}

//         {!otpSent && (
//           <p className="mt-4 text-center text-sm">
//             Already have an account? <a href="/login" className="text-blue-600">Login</a>
//           </p>
//         )}
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//       <ToastContainer position="top-center" />
      
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Create Account</h2>
//           <p className="text-gray-500">Join our community today</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="john@example.com"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               type="tel"
//               placeholder="+1 234 567 890"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               At least 6 characters with 1 letter
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
//           >
//             {loading ? (
//               <BeatLoader color="#ffffff" size={10} />
//             ) : (
//               'Create Account'
//             )}
//           </button>

//           <div className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
//               Sign in
//             </a>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z]).{6,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error('Password must be at least 6 characters with at least one letter');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/register', formData);
      if (response.data.status) {
        toast.success("🎉 Registration successful! Check your email for OTP.");
        setOtpSent(true);
        localStorage.setItem("email", formData.email);
      } else {
        toast.error(response.data.message || "⚠️ Registration failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "🚨 Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/verify-otp", {
        email: formData.email,
        otp,
      });

      if (response.data.status) {
        setSuccessMessage("✅ OTP Verified! You can now log in.");
        toast.success("OTP verified successfully!");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.message || "Invalid OTP. Try again.");
      }
    } catch (err) {
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <ToastContainer position="top-center" />
      <form
        onSubmit={otpSent ? handleOtpSubmit : handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            {otpSent ? 'Verify OTP' : 'Create Account'}
          </h2>
          <p className="text-gray-500">
            {otpSent ? 'Enter the OTP sent to your email.' : 'Join our community today'}
          </p>
        </div>

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              At least 6 characters with 1 letter
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            {successMessage && (
              <p className="text-green-600 text-sm text-center">{successMessage}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 mt-6 rounded-lg font-medium flex items-center justify-center"
        >
          {loading ? <BeatLoader color="#ffffff" size={10} /> : (otpSent ? "Verify OTP" : "Create Account")}
        </button>

        {!otpSent && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
