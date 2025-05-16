import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";
import colors from "tailwindcss/colors";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/users/forgot-password", {
        email,
      });

      toast.success(response.data.message || "Reset link sent!");
      setEmail("");
      setError("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex justify-center items-center px-4">
          <div className="w-full md:w-6/12 lg:w-4/12">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h2 className="text-lightBlue-600 text-sm font-bold">
                    Forgot Password
                  </h2>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
             
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${
                        loading
                          ? "bg-lightBlue-400 cursor-not-allowed"
                          : "bg-lightBlue-600 hover:bg-lightBlue-700"
                      } text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150`}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                 
                    </button>     <br/> 
                  <br/>  <b style={{ color: "#2F4F4F", float:"left" }}>Don't forget To check your spam</b>
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
