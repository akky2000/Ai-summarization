import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import VerifyEmailPage from './pages/VerifyEmailPage';
// import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import VerifyEmail from "./pages/VerifyEmail";
import DocumentUpload from "./pages/DocumentUpload";
import AllDocument from "./pages/AllDocument";
import Profile from "./pages/user/Profile";
import UpdateProfile from "./pages/user/UpdateProfile";
import { useDocuments } from "./hooks/useDocuments";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector(state=> state.auth)
    useDocuments(user?._id)
  
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/email-verify" element={<VerifyEmail />} />


        {/* Main app layout with nested routes */}
        <Route path="/" element={<HomePage />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload-document" element={<DocumentUpload />} />
          <Route path="all-document" element={<AllDocument />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-profile" element={<UpdateProfile />} />



        </Route>

        {/* Optional: redirect /landingPage to /landing if used mistakenly */}
        <Route path="/landingPage" element={<Navigate to="/landing" replace />} />

        {/* Catch-all 404 route (optional) */}
        <Route path="*" element={<div className="p-8 text-center text-gray-500 text-xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
