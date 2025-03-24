/*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "services/ApiUser";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

export default function Navbar() {
    // apis logout 
    const history = useHistory();

    const handleLogout = async () => {
      try {
        
        const response = await logout();
  
        if (response.status === 200) {
    
          localStorage.removeItem("role");
  
   
          toast.success("Logged out successfully");
  
          
          history.push("/auth/login2");
        }
      } catch (error) {
      
        toast.error("Failed to log out");
      }
    };
  











  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
    
      <nav className="top-0 fixed w-full z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-700 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
   
          <Link
            className="text-white text-lg font-bold leading-relaxed uppercase tracking-wide"
            to="/"
          >
            RH Platforme
          </Link>
          
          {/* Menu Button for Mobile */}
          <button
            className="cursor-pointer text-xl px-3 py-1 border border-transparent rounded bg-transparent lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="text-white fas fa-bars"></i>
          </button>

          {/* Navbar Links */}
          <div
            className={`lg:flex flex-grow items-center transition-all duration-300 ease-in-out ${
              navbarOpen ? "block bg-white rounded shadow-lg p-3" : "hidden lg:block"
            }`}
          >
            <ul className="flex flex-row list-none lg:ml-auto">
            
              <li className="flex items-center">
                <Link
                  to="/services"
                  className="text-white hover:text-gray-200 px-4 py-2 text-sm font-semibold uppercase transition duration-200"
                >
                  Services
                </Link>
              </li>
              <li className="flex items-center">
              <button
            onClick={handleLogout}
            className="text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg"
          >
            Logout
          </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
