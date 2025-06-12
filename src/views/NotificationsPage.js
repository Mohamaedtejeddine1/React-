import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "components/CandidatNav/Nav.js";
const MyNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Your JWT must be stored here

      const res = await axios.get("http://localhost:5000/applications/getMyNotifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <><Navbar/>
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📩 My Notifications</h2>
      {notifications.length === 0 ? (
        <p>Aucune notification trouvée.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li key={notif._id} className="bg-lightBlue-200 shadow p-3 rounded">
              <p>{notif.message}</p>
               <p>{notif.comment }</p>
              <small className="text-gray-500">
                {new Date(notif.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default MyNotifications;
