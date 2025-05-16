import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signup } from "../../services/ApiUser"; // Your API call service
import { useHistory } from "react-router-dom";

export default function Register() {
    const history = useHistory();
    const [role, setRole] = useState("candidat");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formValidation = () => {
        let status = true;

        if (username === "") {
            toast.error("Username required");
            status = false;
        }

        if (email === "") {
            toast.error("Email required");
            status = false;
        }

        if (password === "" || password.length < 8 || !/[A-Z]/.test(password)) {
            toast.error("Password must be at least 8 characters and include at least one uppercase letter.");
            status = false;
        }

        return status;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            const data = {
                email: email,
                password: password,
                role: role,
                username: username,
            };
            try {
                const response = await signup(data);
                toast.success("User signed up successfully. Please check your inbox for the verification link.");
                setUsername("");
                setEmail("");
                setPassword("");
                setRole("candidat"); // Reset to default role
                history.push("/auth/login");
            } catch (err) {
                toast.error(err.response.data.message);
            }
        } else {
            console.log("Form is invalid");
        }
    };

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-start justify-center h-full pb-8 pt-2">
                <div className="w-full lg:w-4/12 px-2">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <Toaster />
                            <div className="text-lightBlue-600 text-center mb-3 font-bold">
                                <h1>Create Account</h1>
                            </div>
                            <hr className="mt-4 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSignup}>
                                {/* Username Field */}
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="border px-3 py-3 placeholder-blueGray-300 text-dark-200 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="border px-3 py-3 placeholder-blueGray-300 text-dark-200 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="border px-3 py-3 placeholder-blueGray-300 text-dark-200 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Role Selection Field */}
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                                        Select Role
                                    </label>
                                    <select
                                        id="role"
                                        className="border px-3 py-3 text-dark-200 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="candidat">Look for a job</option>
                                        <option value="recruteur">Recruiter</option>
                                    </select>
                                </div>

                                {/* Submit Button and Link */}
                                <div className="text-center mt-6">
                                    <button
                                        className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                    <Link
                                        to="/auth/login"
                                        className="text-lightBlue-600 hover:underline mt-3 block"
                                    >
                                        <small>Already have an account?</small>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
