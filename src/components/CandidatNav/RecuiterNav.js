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


        history.push("/auth/login");
      }
    } catch (error) {

      toast.error("Failed to log out");
    }
  };












  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>

      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-lightBlue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <h1
              className="text-white text-lg font-bold leading-relaxed uppercase tracking-wide"
              to="/landing"
            >
              RH Platforme
            </h1>
            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div className="lg:flex flex-grow items-center">



            <ul className="flex flex-col lg:flex-row list-none ml-auto">

              <li className="nav-item">
                <Link
                  to="/Acceuil"
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/MyProfil"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Profil
                </Link>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  Logout
                </button >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
