import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Login2() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      history.push("/admin/tables");
    }
  }, [history]);

  const formValidation = () => {
    let valid = true;
    let localErrors = { email: "", password: "" };

    if (!email) {
      localErrors.email = "Email required";
      valid = false;
    }
    if (!password || password.length < 8) {
      localErrors.password = "Password required (min. 8 characters)";
      valid = false;
    }

    setErrors(localErrors);
    return valid;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    try {
      // Replace with your real backend URL
      const res = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // Assuming your backend returns something like:
      // { token: "...", user: { role: "admin", ... } }
      const { token, user } = res.data;

      if (user.role === "admin") {
        toast.success("Admin logged in successfully");
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        history.push("/admin/tables");
      } else {
        toast.error("Access denied. Admins only.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12 lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Toaster />
                  <h2 className="text-lightBlue-600 text-sm font-bold">
                    Welcome Admin!
                  </h2>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSignin}>
                  {/* Email Field */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                    {errors.email && (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="Password"
                      required
                    />
                    {errors.password && (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-6">
                    <button
                      className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
