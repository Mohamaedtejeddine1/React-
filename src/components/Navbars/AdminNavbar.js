import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "services/ApiUser"; 
import toast from "react-hot-toast";

export default function Navbar() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      
      const response = await logout();

      if (response.status === 200) {
        // Clear role information from local storage
        localStorage.removeItem("role");

 
        toast.success("Logged out successfully");

        
        history.push("/auth/login2");
      }
    } catch (error) {
    
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-blue text-white b-2 active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
