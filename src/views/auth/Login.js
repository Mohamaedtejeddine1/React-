import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signin } from "../../services/ApiUser";
import { useHistory } from "react-router-dom";
import Footer from "components/Footers/Footer.js"; 

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const formValidation = () => {
    let status = true;
    let localErrors = { ...errors };
    if (email === "") {
      localErrors.email = "Email required";
      status = false;
    } else {
      localErrors.email = ""; // Clear error if valid
    }
    if (password === "") {
      localErrors.password = "Password required";
      status = false;
    } else if (password.length < 8) {
      localErrors.password = "Password must be at least 8 characters long"; // More specific message
      status = false;
    } else {
      localErrors.password = ""; // Clear error if valid
    }
    setErrors(localErrors);
    return status;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    if (formValidation()) {
      const data = {
        email: email,
        password: password,
      };

      try {
        const response = await signin(data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Token stored:", localStorage.getItem("token"));
        } else {
          console.log("No token received from backend");
        }

        console.log("response ", response);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("User signed in successfully");
        setEmail('');
        setPassword('');

        if (response.data.user.role === "candidat") {
          history.push("/landing");
        }
        if (response.data.user.role === "recruteur") {
          history.push("/recuiter");
        } 
        
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } else {
      console.log("form invalid");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12 lg:w-4/12 px-4 pb-20">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Toaster />
                  <h2 className="text-lightBlue-600 text-x15 font-bold">Sign in on your account</h2>
                </div>
                <hr className="mt-6 border-b-10 border-blueGray-800" />
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
                      className={`border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.password ? "border-red-500" : ""
                        }`}
                      placeholder="Password"
                      required
                    />
                    {errors.password && (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {errors.password}
                      </div>
                    )}
                    {/* Forgot password link directly under password field */}
                 <div className="text-right mt-2 text-sm">
                      <Link
                        to="/Forgotpassword"
                        className="text-lightBlue-600 hover:underline font-bold"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <button
                      className="bg-lightBlue-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                    {/* Create account link directly under the Sign In button */}
                 <div className="flex justify-center mt-6 text-sm">
  <span className="text-blueGray-500 mr-1"></span>
  <Link
    to="/auth/register"
    className="text-lightBlue-600 hover:underline font-bold"
  >
 Don’t have an account?
  </Link>
</div>
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