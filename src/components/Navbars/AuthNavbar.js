/*eslint-disable*/
import React from "react";


import toast from "react-hot-toast";

import { Link } from "react-router-dom";

export default function Navbar() {
    // apis logout 
    

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
    
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-lightBlue-500 mb-3">
  <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
    <h1
         className="text-white text-lg font-bold leading-relaxed uppercase tracking-wide"
      
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



              <Link
                  to="/auth/login"
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Login 
                </Link>
      <li className="nav-item">


 
      <Link
                  to="/auth/login2"
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Login as Admin
                </Link>
              
              </li>
           
       
      </ul>
    </div>
  </div>
</nav>
    </>
  );
}
