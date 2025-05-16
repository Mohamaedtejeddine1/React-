import React, { useEffect, useState } from 'react';
import Nav from 'components/CandidatNav/RecuiterNav';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar2 from 'components/Sidebar/sidebar2';

export default function InterviewManager() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/interview/getAllInterviews');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInterviews(data || []);
    } catch (error) {
      toast.error("Failed to load interviews");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this interview?")) return;

    try {
      const response = await fetch(`http://localhost:5000/interview/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete interview");

      toast.success("Interview deleted");
      fetchInterviews(); // Refresh list
    } catch (error) {
      toast.error(error.message || "Error deleting interview");
      console.error(error);
    }
  };

  if (loading) return <div>Loading interviews...</div>;

  return (
    
    <div className="flex h-screen">
      <Toaster />
      
       {/* This will be on the left */}
      <div className="flex-1 overflow-auto">
   <Nav />     <Sidebar2 />
        <div className="container mx-auto pl-8 ml-0 md:ml-64"> {/* Added ml-0 md:ml-64 for sidebar space */}
          <h2 className="text-2xl font-bold mb-4">List Of Interviews</h2>

          {interviews.length === 0 ? (
            <p>No interviews scheduled yet.</p>
          ) : (
            <ul className="space-y-4">
              {interviews.map((interview) => (
                <li key={interview._id} className="border p-4 rounded shadow bg-white">
                  <p><strong>Offer:</strong> {interview.offre?.titre || 'N/A'}</p>
                  <p><strong>Candidate:</strong> {interview.candidate?.username} ({interview.candidate?.email})</p>
                  <p><strong>Recruiter:</strong> {interview.recruiter?.username} ({interview.recruiter?.email})</p>
                  <p><strong>Date:</strong> {new Date(interview.date).toLocaleString()}</p>
                  <p><strong>Location:</strong> {interview.location || 'N/A'}</p>
                  <p><strong>Status:</strong> {interview.status}</p>
                  <button
                    onClick={() => handleDelete(interview._id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}