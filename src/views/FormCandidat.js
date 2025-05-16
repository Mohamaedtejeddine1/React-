import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "components/CandidatNav/Nav.js";
import toast, { Toaster } from "react-hot-toast";
import Footer from "components/Footers/Footer.js";

export default function FormCandidat() {
  const location = useLocation();
  const { selectedOffreId } = location.state || {};

  const [formData, setFormData] = useState({

    competance: "",
    experiences: "",
    telephone: "",
    email: "",
    Motivationletter: "",
    location: "",
    cvFile: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cvFile: e.target.files[0] // Store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      if (!userId) throw new Error("User not authenticated");
      if (!selectedOffreId) throw new Error("No offer selected");
    
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'cvFile') {
          formDataToSend.append(key, formData[key]);
        }
      });
    
      if (formData.cvFile) {
        formDataToSend.append('cv', formData.cvFile);
      }
    
      const response = await axios.post(
        `http://localhost:5000/users/postulerA/${userId}/${selectedOffreId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
      setFormData({
    
        competance: "",
        experiences: "",
        telephone: "",
        location: "",

        email: "",
        cvFile: null
      });
      toast.success(" Postulate successfuly !");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Application failed");
      toast.error("Something Woring ...");
    } finally {
      setIsSubmitting(false);
    }}

  return (
    <>
      <Navbar transparent />
      <main className="">
        <section className="py-10 bg-blueGray-100 min-h-screen flex justify-center items-center">
          <div className="w-full md:w-6/12 lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Toaster />
                  <h2 className="text-lightBlue-600 text-sm font-bold">Postuler à l'offre</h2>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  {[
                   
                    { name: "email", label: "Email", type: "email" },
                    { name: "telephone", label: "Téléphone", type: "text" },
                    { name: "competance", label: "skills", type: "text" },
                    { name: "experiences", label: "Expérience", type: "text" },
               { name: "location", label: "location", type: "text" },

                    
                  ].map(({ name, label, type }) => (
                    <div key={name} className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={name}>
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        id={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={label}
                        className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  ))}

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="cvFile">
                      CV (PDF/DOC)
                    </label>
                    <input
                      type="file"
                      name="cvFile"
                      id="cvFile"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-blueGray-600 border border-gray-300 rounded py-2 px-3"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    >
                      {isSubmitting ? "Sending ..." : "Postuler"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}