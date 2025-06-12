import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar2 from 'components/Sidebar/sidebar2';
import Nav from 'components/CandidatNav/RecuiterNav';
import Footer from "components/Footers/Footer.js";
export default function CreateInterviewPage() {
  const [form, setForm] = useState({
    offer: "",
    email: "",
    date: "",
    time: "",
    location: "",
  }); 
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch("http://localhost:5000/offres/getAllOffres",);
      if (!res.ok) throw new Error("Failed to fetch offers");
      const data = await res.json();
      setOffers(data);
      setLoading(true);
    } catch (err) {
      toast.error("Failed to load offers");
      console.error(err);
    setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.offer ||
      !form.email.trim() ||
      !form.date ||
      !form.time ||
      !form.location.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
   const token = localStorage.getItem("token");
const res = await fetch("http://localhost:5000/interview/createInterview", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`  // <-- inside headers object
  },
  body: JSON.stringify(form),
});

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create interview");

      toast.success("Interview created and email sent!");
      setForm({ offer: "", email: "", date: "", time: "", location: "" });
       setIsSubmitting(true);
    } catch (error) {
      toast.error(error.message);
       setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Toaster />
      <Sidebar2 />

      <div className="flex-1 overflow-y-auto bg-gray-100">
        <Nav />
        <div className="max-w-3xl mx-auto p-6 md:ml-64">
          <h2 className="text-3xl font-bold mb-6 text-lightBlue-500">Create a New Interview</h2>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
            <div>
         
              <select
                name="offer"         
                value={form.offer}   
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">Select offer</option>
                {offers.map((offer) => (
                  <option key={offer._id} value={offer._id}>
                    {offer.titre}
                  </option>
                ))}
              </select>
            </div>
        &nbsp;&nbsp; 
            <div>
         
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Candidate email"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
     &nbsp;&nbsp; 
            <div>
              
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
        &nbsp;&nbsp;
            <div>
             
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
        &nbsp;&nbsp; 
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Zoom link or office address"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
        &nbsp;&nbsp; 
            <button
              type="submit"
               disabled={isSubmitting}
              className="w-full bg-lightBlue-500 text-white py-2 rounded hover:bg-blue-700 transition"
            > {isSubmitting ? "Creating ....." : " Create a New Interview "}
           
            </button>
          </form>
        </div>
      
      </div>
      
    </div>

  );
  
}
