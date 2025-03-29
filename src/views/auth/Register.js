import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signup } from "../../services/ApiUser";
import { useHistory } from "react-router-dom"; 

export default function Register() {
    const history = useHistory();
    const [role, setRole] = useState("candidat");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const formValidation = () => {
        let status = true;
        let localErrors = { ...errors };
        if (username === "") {
            localErrors.username = "Username required";
            status = false;
        }

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
                
                toast.success("User signed up successfully");
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
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <Toaster />
                                <div className="text-blue-600 text-center mb-3 font-bold">
                                    <h1>Create Account</h1>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleSignup}>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                                            Select Role
                                        </label>
                                        <select
                                            id="role"
                                            className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="candidat">Candidate</option>
                                            <option value="recruteur">Recruiter</option>
                                        </select>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Create Account
                                        </button>

                                        <Link
                                            to="/auth/login"
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 w-full ease-linear transition-all duration-150 block"
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
        </>
    );
}
