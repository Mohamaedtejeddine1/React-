import React, { useState, useEffect } from "react";
import { updateProfil, getUserProfile } from "../services/ApiUser";
import toast, { Toaster } from "react-hot-toast";
import Footer from "components/Footers/Footer.js";
import Nav from "components/CandidatNav/RecuiterNav";

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-gray-300 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 bg-blueGray-200 px-4 py-3 rounded-md w-full bg-white text-gray-900 focus:ring focus:ring-lightBlue-500 transition-all duration-300"
      />
    </div>
  );
}

export default function MyProfilRecruiter() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    telephone: "",
    location: "",
    company: "",
    poste: "",
    profilImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) return;

      try {
        const response = await getUserProfile(user._id);
        setUserData(response.data);
      } catch (error) {
        toast.error("Error loading profile");
        console.error("Fetch getUserProfile error:", error);
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
      toast.error("Profile update failed");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilImage", file);

    const user = JSON.parse(localStorage.getItem("user"));

    setImageLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/updateProfilImage/${user._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Image updated!");
        setUserData((prev) => ({ ...prev, profilImage: data.profilImage }));
      } else {
        toast.error("Error uploading image");
      }
    } catch (err) {
      toast.error("Server error");
      console.error("Image change error:", err);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .img-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          border-radius: 50px;
        }

        img {
          width: 240px;
          height: 240px;
          object-fit: cover;
          float: center;
          border-radius: 9999px;
          border: 3px solid #fff;
        }
      `}</style>

      <Nav />
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 min-h-screen">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-8/12 px-4  ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border border-gray-600">
              <div className="rounded-t bg-green-500 mb-0 px-6 py-6">
                <div className="text-center flex justify-between ">
                  <h6 className="text-lightBlue-600 text-xl font-bold">My Profile</h6>
                </div>
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleUpdateProfile}>
                  {/* Profile Image */}
                  <div className="mb-6 text-center">
                    <div className="img-container">
                      <img
                        src={
                          userData.profilImage
                            ? `http://localhost:5000/uploads/${userData.profilImage}`
                            : "/default-profile.png"
                        }
                        alt="Profile"
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="profileImageUpload"
                        className="cursor-pointer bg-blueGray-800 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
                      >
                        {imageLoading ? "Uploading..." : "Change Image"}
                      </label>
                      <input
                        id="profileImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={imageLoading}
                      />
                    </div>

                    {imageLoading && <p>Uploading image...</p>}
                  </div>

                  <h6 className="text-lightBlue-600 text-sm mt-3 mb-6 font-bold uppercase">Personal Information</h6>
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
                        label="Phone"
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
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Company"
                        value={userData.company}
                        onChange={(value) => setUserData({ ...userData, company: value })}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <InputField
                        label="Position"
                        value={userData.poste}
                        onChange={(value) => setUserData({ ...userData, poste: value })}
                      />
                    </div>
                  </div>

                  <div className="mt-6 px-4">
                    <button
                      type="submit"
                      className="bg-lightBlue-500 text-white px-6 py-3 rounded-md w-full text-sm font-semibold hover:bg-lightBlue-600 transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
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
