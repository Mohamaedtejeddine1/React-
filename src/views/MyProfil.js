import React, { useState, useEffect } from "react";
import { updateProfil, getUserProfile } from "../services/ApiUser";
import toast, { Toaster } from "react-hot-toast";
import Footer from "components/Footers/Footer.js";
import Nav from "components/CandidatNav/Nav.js";

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-gray-300 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 px-4 py-3 rounded-md w-full bg-white text-gray-900 focus:ring focus:ring-lightBlue-500 transition-all duration-300"
      />
    </div>
  );
}

export default function MyProfil() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    competance: "",
    experiences: "",
    telephone: "",
    location: "",
    offres: [],
    cvLink: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) return;

      try {
        const response = await getUserProfile(user._id);
        setUserData(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil");
        console.error("Erreur fetch getUserProfile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await updateProfil(user._id, userData);
      toast.success("Profile updated successfully");
      localStorage.setItem("user", JSON.stringify({ ...user, ...userData }));
    } catch (err) {
      toast.error("Update failed");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <Toaster position="top-center" />
      <div className="container mx-auto px-4 h-full bg-gray-800 min-h-screen">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-700 border border-gray-600">
              <div className="rounded-t bg-green-500 mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-lightBlue-600 text-xl font-bold">My Profile</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleUpdateProfile}>
                  <h6 className="text-lightBlue-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Username"
                        value={userData.username}
                        onChange={(value) => setUserData({ ...userData, username: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Email"
                        type="email"
                        value={userData.email}
                        onChange={(value) => setUserData({ ...userData, email: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Skills"
                        value={userData.competance}
                        onChange={(value) => setUserData({ ...userData, competance: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Expériences"
                        value={userData.experiences}
                        onChange={(value) => setUserData({ ...userData, experiences: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Téléphone"
                        value={userData.telephone}
                        onChange={(value) => setUserData({ ...userData, telephone: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Location"
                        value={userData.location}
                        onChange={(value) => setUserData({ ...userData, location: value })}
                      />
                    </div>

                    <div className="w-full px-4">
                      <label className="block text-gray-300 text-sm font-semibold mb-2">Positions Applied</label>
                      <div className="bg-gray-900 rounded py-3 px-3 shadow text-gray-300 text-sm">
                        {Array.isArray(userData.offres) && userData.offres.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {userData.offres.map((offre, index) => (
                              <li key={index}>{offre?.titre || `Offre ${index + 1}`}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Aucune offre sélectionnée</p>
                        )}
                      </div>
                    </div>
                    {userData.cvLink && (
                      <div className="mt-4 px-4">
                        <a
                          href={userData.cvLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-lightBlue-500 hover:bg-green-600 text-white px-6 py-3 rounded-md w-full text-sm font-semibold transition-all duration-300 text-center block"
                        >
                          View CV
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 px-4">
                    <button
                      type="submit"
                      className="bg-lightBlue-500 text-white px-6 py-3 rounded-md w-full text-sm font-semibold hover:bg-lightBlue-600 transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
