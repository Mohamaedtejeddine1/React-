// components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="fixed h-full w-64 bg-white border-r-2 border-gray-200 p-4 space-y-4 text-gray-700">
      <h2 className="text-xl font-bold mb-6 text-blue-600 border-b border-gray-200 pb-4">
        Interview Manager
      </h2>
      <ul className="space-y-2">
        <li>
          <NavLink 
            to="/recuiter" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors border-l-4 ${isActive 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'hover:bg-gray-100 border-transparent'}`
            }
          >
            <span>📋</span>
            <span>View Interviews</span>
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/schedule-interview" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors border-l-4 ${isActive 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'hover:bg-gray-100 border-transparent'}`
            }
          >
            <span>➕</span>
            <span>Schedule Interview</span>
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/cancel-interview" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors border-l-4 ${isActive 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'hover:bg-gray-100 border-transparent'}`
            }
          >
            <span>❌</span>
            <span>Cancel Interview</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}