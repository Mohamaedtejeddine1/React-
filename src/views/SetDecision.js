import React, { useState, useEffect } from 'react';
import Nav from "components/CandidatNav/RecuiterNav";

const DecisionForm = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Accepted');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
          const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Authentication required. Please log in.");
      setIsLoading(false);
      return;
    }
      try {
 const res = await fetch('http://localhost:5000/offres/getOffresByRecruteur', { // The options object starts here
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
}); // The options object closes here, and the fetch call completes
        
        if (!res.ok) throw new Error("Failed to fetch offers");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        setMessage(`❌ ${err.message}`);
      }
    };
    fetchOffers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Authentication required. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/applications/setDecision', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          offerTitle: selectedOffer,
          email,
          status,
          comment,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update decision");

      setMessage("✅ Decision updated and notification sent!");
      setEmail('');
      setComment('');
      setSelectedOffer('');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center min-h-screen  ">
        {/* Adjust width here (60% = w-3/5, 70% = w-7/10) */}
        <div className="w-full lg:w-8/12 px-10  border-red-200 max-w-3xl bg-white p-6 rounded-lg shadow-sm"> 
          <h2 className="text-xl font-semibold text-center mb-4">Set Application Decision</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Offer</label>
              <select
                value={selectedOffer}
                onChange={(e) => setSelectedOffer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- Select an Offer --</option>
                {offers.map((offer) => (
                  <option key={offer._id} value={offer.titre}>
                    {offer.titre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                required
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Decision</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              >
   <option value="Accepted" style={{ background: 'lightgreen' }}>Accepted</option>
                <option value="Rejected" className="bg-red-400">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                rows="3"
                placeholder="Reason for the decision"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-lightBlue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isLoading ? "Processing..." : "Submit Decision"}
            </button>

            {message && (
              <p className={`text-center text-sm mt-2 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default DecisionForm;