import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signin } from "../../services/ApiUser";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory(); // Using useHistory for navigation
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
    }
    if (password === "" || password.length < 8) {
      localErrors.password = "Password required";
      status = false;
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
        console.log("response ", response);
        toast.success("User signed in successfully");
        setEmail('');
        setPassword('');
        
      
        if (response.data.user.role === "candidat") {
          history.push("/landing"); 
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
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Toaster />
                  <h6 className="text-blue-600 text-sm font-bold">Sign in</h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSignin}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                    {errors.email && (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

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
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.password ? "border-red-500" : ""
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

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
                <Link to="/auth/forget" className="text-blueGray-200">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
