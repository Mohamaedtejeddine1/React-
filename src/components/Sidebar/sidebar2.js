// components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="fixed h-full w-64 bg-white border-r border-gray-300 p-6 space-y-6 text-gray-800 shadow-sm">
       <h2 className="text-2xl font-semibold mb-8 text-blue-700 border-b border-blue-200 pb-4">
        Interview Manager
      </h2> 
    

      <ul className="space-y-3">
        <li>
          <NavLink
            to="/InterviewManager"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-colors border-l-4 ${
                isActive
                  ? "md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  : "hover:bg-blue-50 border-transparent"
              }`
            }
          >
            <span>📋</span>
            <span>View Interviews</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/CreateInterviewPage"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-colors border-l-4 ${
                isActive
                  ? "md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  : "hover:bg-blue-50 border-transparent"
              }`
            }
          >
            <span>➕</span>
            <span>Create Interview</span>
          </NavLink>
        </li>

       
        <li>
          <NavLink
            to="/Calender"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-colors border-l-4 ${
                isActive
                  ? "md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  : "hover:bg-blue-50 border-transparent"
              }`
            }
          >
            <span>➕</span>
            <span>My Calender</span>
          </NavLink>
        </li>
            <li>
          <NavLink
            to="/Gemini"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-colors border-l-4 ${
                isActive
                  ? "md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  : "hover:bg-blue-50 border-transparent"
              }`
            }
          >
            <span>➕</span>
            <span>Questions </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
