import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login2() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "admin") {
      history.push("/admin/tables");
    }
  }, [history]);

  const formValidation = () => {
    let status = true;
    let localErrors = { email: "", password: "" };

    if (!email) {
      localErrors.email = "Email required";
      status = false;
    }
    if (!password || password.length < 8) {
      localErrors.password = "Password required (min. 8 characters)";
      status = false;
    }

    setErrors(localErrors);
    return status;
  };

  const handleSignin = (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (email === "admin@gmail.com" && password === "adminA@128") {
        toast.success("Admin signed in successfully");
        localStorage.setItem("role", "admin");
        history.push("/admin/tables");
      } else {
        toast.error("Access denied. Admins only.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <Toaster />
                <h6 className="text-blue-600 text-sm font-bold">Admin Sign in</h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSignin}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    required
                  />
                  {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Password"
                    required
                  />
                  {errors.password && <div className="text-red-500">{errors.password}</div>}
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              {/* <Link to="/auth/forget" className="text-blueGray-200">
                <small>Forgot password?</small>
              </Link> */}
            </div>
            <div className="w-1/2 text-right">
              {/* <Link to="/auth/register" className="text-blueGray-200">
                <small>Create new account</small>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
