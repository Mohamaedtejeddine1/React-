import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      const msg = "Password reset link has expired.";
      setError(msg);
      toast.error(msg);
    }
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if  (newPassword === "" || newPassword.length < 8 || !/[A-Z]/.test(newPassword)){
      const msg = "Password must be at least 8 characters and include at least one uppercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/users/resetpassword/${token}`,
        { newPassword }
      );
      toast.success(response.data.message);
      history.push("/auth/login");
     
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
      toast.error(msg);
    }
    
  };

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex justify-center items-center px-4">
          <div className="w-full md:w-6/12 lg:w-4/12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h2 className="text-lightBlue-600 text-sm font-bold">
                    Reset Your Password
                  </h2>
                  {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handlePasswordReset}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="New Password"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
