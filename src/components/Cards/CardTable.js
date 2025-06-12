import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, deleteUserById, createUser } from "../../services/ApiUser";
// New function to fetch counts from backend API
import axios from "axios";
export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userCounts, setUserCounts] = useState({ candidatCount: 0, recruteurCount: 0 });

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log("API Response:", response.data);
      setUsers(response.data.userListe || []);
    } catch (error) {
      console.error("Error fetching users:", error.response ? error.response.data : error.message);
    }
  };
 
  // Fetch counts for candidat and recruteur
  const getUserCounts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/getCounts");
      setUserCounts(res.data);
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      getUsers();
      getUserCounts(); // refresh counts after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const AddNewUser = async () => {
    try {
      await createUser(newUser);
      getUsers();
      getUserCounts(); // refresh counts after add
      setNewUser({ username: "", email: "", role: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit user handler
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  useEffect(() => {
    getUsers();
    getUserCounts();  // fetch counts on mount
  }, []);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg  " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List Users
              </h3>

              {/* NEW: Display user counts here */}
              <div
                className={
                  "mb-4 p-3 rounded " +
                  (color === "light" ? "bg-blueGray-50 text-blueGray-700" : "bg-lightBlue-800 text-lightBlue-300")
                }
              >
                <p><strong>Candidates:</strong> {userCounts.candidatCount}</p>
                <p><strong>Recruiters:</strong> {userCounts.recruteurCount}</p>
              </div>

              <div className="">
                <input
                  type="text"
                  placeholder="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                />
                &nbsp; &nbsp;
                <input
                  type="text"
                  placeholder="role"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                />
                <br />
                <button
                  onClick={AddNewUser}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Users Table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Username
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  CreatedAt
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        (color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {user.username}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.role}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <button
                  className="bg-red-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "black",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
