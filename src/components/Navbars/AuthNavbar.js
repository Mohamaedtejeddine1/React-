/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              RH Platforme
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* Adjust this UL for items in a row */}
            <ul className="flex flex-row list-none lg:ml-auto">
              {/* Add Login as Admin link */}
              <li className="flex items-center">
                <Link
                  to="/auth/login2"
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Login as Admin
                </Link>
              </li>
              {/* Other navbar items can go here */}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
