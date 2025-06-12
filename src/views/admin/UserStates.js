import React, { useEffect, useState } from "react";
import axios from "axios";
import colors from "tailwindcss/colors";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/getUsersStats")
      .then((res) => {
        setUserStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 flex justify-center"
      style={{
        paddingTop: "80px", // Adjust this based on your header height
        paddingBottom: "30px",
      }}
    >
      <div className="flex flex-col justify-center w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-lightBlue-600 text-center">
          User Login Stats
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-lightBlue-500 text-white">
                <th className="border-b p-3 text-left">Username</th>
                <th className="border-b p-3 text-left">Email</th>
                <th className="border-b p-3 text-left">Role</th>
                <th className="border-b p-3 text-left">Login Count</th>
                <th className="border-b p-3 text-left">Online?</th>
                <th className="border-b p-3 text-left">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {userStats.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3">{user.username || "N/A"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">{user.loginCount || 0}</td>
                  <td className="p-3">
                    {user.isOnline ? (
                      <span style={{color: 'SeaGreen'}}>Online</span>
                    ) : (
                      <span className="text-red-500">Offline</span>
                    )}
                  </td>
                  <td className="p-3">
                    <td className="p-3">
                    {user.lastLogin ? (
                      new Date(user.lastLogin).toLocaleDateString()
                    ) : (
                      <span className="text-gray-600 italic">No logins yet</span>
                    )}
                  </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
