import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const location = useLocation();
  const history = useHistory();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/users/verify-email?token=${token}`
        );
        setStatus("success");
        setMessage(" Email verified successfully! Redirecting to login...");
        toast.success(response.data.message);

        setTimeout(() => {
          history.push("/auth/login");
        }, 4000);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Verification failed or link expired."
        );
        toast.error( (err.response?.data?.message || "Verification failed"));
      }
    };

    verifyEmail();
  }, [location, history]);

  const renderVisual = () => {
    if (status === "loading") {
      return (
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
      );
    }
    if (status === "success") {
        return <div style={{ color: "green", fontSize: "3rem", marginBottom: "1rem" }}>✔️</div>;
    }
    return <div  className="text-red-500 text-5xl mb-4">❌</div>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
        {renderVisual()}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Email Verification</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        {status === "error" && (
          <button
            onClick={() => history.push("/auth/login")}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}
