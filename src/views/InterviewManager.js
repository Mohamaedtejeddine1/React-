import React, { useEffect, useState } from 'react';
import Nav from 'components/CandidatNav/RecuiterNav';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar2 from 'components/Sidebar/sidebar2';

export default function InterviewManager() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/interview/getInterviewsByRecruiter', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch interviews');

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

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/interview/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error("Failed to delete interview");

      toast.success("Interview deleted");
      fetchInterviews();
    } catch (error) {
      toast.error(error.message || "Error deleting interview");
      console.error(error);
    }
  };

  const handleEditClick = (interview) => {
    setEditingId(interview._id);
    setEditData({
      status: interview.status,
      notes: interview.notes || "",
      feedback: interview.feedback || "",
      date: interview.date,
      location: interview.location,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/interview/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) throw new Error("Failed to update interview");

      toast.success("Interview updated");
      setEditingId(null);
      fetchInterviews();
    } catch (error) {
      toast.error(error.message || "Error updating interview");
      console.error(error);
    }
  };

  if (loading) return <div>Loading interviews...</div>;

  return (
    <div className="flex h-screen">
      <Toaster />
      <div className="flex-1 overflow-auto">
        <Nav />
        <Sidebar2 />
        <div className="container mx-auto pl-8 ml-0 md:ml-64">
          <h2 className="text-2xl font-bold mb-4 text-lightBlue-600">List Of Interviews</h2>

          {interviews.length === 0 ? (
            <p>No interviews scheduled yet.</p>
          ) : (
            <ul className="space-y-4">
              {interviews.map((interview) => (
                <li key={interview._id} className="border p-4 rounded shadow bg-white">
                  <p><strong>Offer:</strong> {interview.offer?.titre || 'N/A'}</p>
                  <p><strong>Recruiter:</strong> {interview.recrut?.username}</p>
                  <p><strong>Email:</strong> {interview.email}</p>
                  <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {interview.time || 'N/A'}</p>
                  <p><strong>Location:</strong> {interview.location}</p>
                  <p><strong>Status:</strong> {interview.status}</p>
                  <p><strong>Meeting Link:</strong> <a href={interview.meetLink} target="_blank" rel="noopener noreferrer">{interview.meetLink}</a></p>

                  {editingId === interview._id ? (
                    <div className="mt-4 space-y-2">
                      <label>Status:
                        <select
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                          className="block w-full border rounded px-2 py-1"
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </label>
          
                  
                      <label>Date:
                        <input
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleEditChange}
                          className="block w-full border rounded px-2 py-1"
                        />
                      </label>
                      <label>Location:
                        <input
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                          className="block w-full border rounded px-2 py-1"
                        />
                      </label>
                 
                      <div className="space-x-2 mt-2">
                        <button
                          onClick={() => handleSave(interview._id)}
                    className="mt-2 ml-2 px-3 py-1 bg-lightBlue-600 text-white rounded hover:bg-red-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                    className="mt-2 ml-2 px-3 py-1 bg-lightBlue-600 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(interview)}
                      className="mt-2 px-3 py-1 bg-lightBlue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(interview._id)}
                    className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
