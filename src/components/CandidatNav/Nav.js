/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bell } from 'lucide-react';
import { logout } from "services/ApiUser";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔔 Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/applications/getUnreadNotificationCount", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadCount(res.data.count);
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    };

    fetchUnreadCount();
  }, []);

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

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-lightBlue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-lg font-bold leading-relaxed uppercase tracking-wide"
              to="/landing"
            >
              RH Platforme
            </Link>
            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div className="lg:flex flex-grow items-center">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
 <li>
  <Link
    to="/NotificationsPage"
    className="relative px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
  >
    <Bell className="w-5 h-5" />
    {unreadCount > 0 && (
      <span style={{ width: '20px',  background:"red"}}
        className="
          absolute
          top-0
          right-0
          bg-red-600
          text-white
          text-[20px]
          font-bold
          min-w-[16px]
          h-[18px]
          px-1
          flex
          items-center
          justify-center
          rounded-full
          border-[1.5px]
          border-white
          shadow-sm
          translate-x-1/2
          -translate-y-1/2
          text-center
          pointer-events-none
        "
      >
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    )}
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
                <button onClick={handleLogout}
                  className="bg-lightBlue-400 px-4 py-2 mx-2 border border-white border-[2px]  rounded-md flex items-center space-x-2 text-xs uppercase font-bold text-white hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
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
