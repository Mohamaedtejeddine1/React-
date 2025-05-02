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
    username: "",
    competance: "",
    experiences: "",
    telephone: "",
    email: "",
    Motivationletter: "",
    currentPosition: "",
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
      
      // Append the file if it exists
      if (formData.cvFile) {
        formDataToSend.append('cv', formData.cvFile);
      }

      const response = await axios.post(
        `http://localhost:5000/users/postulerA/${userId}/${selectedOffreId}`,
        formDataToSend, // Send as FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
  
      setSuccess(true);
      setFormData({
        username: "",
        competance: "",
        experiences: "",
        telephone: "",
        currentPosition: "",
        Motivationletter: "",
        email: "",
        cvFile: null
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Application failed");
      toast.error("Something went wrong. Please try again.");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main className="">
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-2">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-x2 rounded-lg mt-16">
              <div className="px-6">
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-sm font-bold uppercase text-lightBlue-600">
                    Recruitment Form
                  </h3>
                  {selectedOffreId && (
                    <div className="mb-4 text-blueGray-600">
                      <p className="text-lg font-bold"></p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-300 px-4 py-3 rounded relative mb-4">
                    {error}
                  </div>
                )}
                {success && (
                  toast.success(" Postulate successfully!"),
                  <div className="bg-green border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"> 
                  < h1 className="text-green "  > Postulate successfully!</h1>
                   </div>
                )}

                <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">
                      {/* Full Name */}
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                   
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Direct telephone
                          </label>
                          <input
                            type="text"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      
                     
                    

                     
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Skills
                          </label>
                          <input
                            type="text"
                            name="competance"
                            value={formData.competance}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Current position
                          </label>
                          <input
                            type="text"
                            name="currentPosition"
                            value={formData.currentPosition}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Number of years of experience
                          </label>
                          <input
                            name="experiences"
                            placeholder="EX:2 years"
                            value={formData.experiences}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>
                      </div>
                      {/* <div className="w-full lg:w-6/12 px-4">
                         <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Motivation Letter
                          </label>
                          <textarea
                            type="text"
                            name="Motivationletter"
                            value={formData.Motivationletter}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div> 
                      </div> */}
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            CV (PDF/DOCX)
                          </label>
                          <input
                            type="file"
                            name="cvFile"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            required
                          />
                        </div>  
                      </div>
                    </div>
        
                    <div className="text-center mt-6">
                      <button
                        className={`bg-lightBlue-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Validate My application"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}