import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getOffresByRecruteur,
  createOffre,
  updateOffre,
  deleteOffre
} from "../services/ApiOffres";
import Nav from "components/CandidatNav/RecuiterNav";
import toast, { Toaster } from "react-hot-toast";

export default function Recruiter({ color = "light" }) {
  const [offres, setOffres] = useState([]);
  const [newOffre, setNewOffre] = useState({
    titre: "",
    competance: "",
    domaine: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [visibleCandidates, setVisibleCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for highest first, 'asc' for lowest

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffre(prev => ({ ...prev, [name]: value }));
  };

  // Create new job offer
  const handleAddOffre = async () => {
    const toastId = toast.loading("Creating job offer...");
    try {
      await createOffre(newOffre);
      toast.success("Job offer created successfully!", { id: toastId });
      getOffres();
      setNewOffre({ titre: "", competance: "", domaine: "" });
    } catch (error) {
      toast.error("Failed to create job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

  // Set up edit mode
  const handleEdit = (offre) => {
    setEditingId(offre._id);
    setNewOffre({
      titre: offre.titre,
      competance: offre.competance,
      domaine: offre.domaine
    });
  };

  // Update existing offer
  const handleUpdate = async () => {
    const toastId = toast.loading("Updating job offer...");
    try {
      await updateOffre(editingId, newOffre);
      toast.success("Job offer updated successfully!", { id: toastId });
      getOffres();
      setEditingId(null);
      setNewOffre({ titre: "", competance: "", domaine: "" });
    } catch (error) {
      toast.error("Failed to update job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

  // Delete job offer
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting job offer...");
    try {
      await deleteOffre(id);
      toast.success("Job offer deleted successfully!", { id: toastId });
      getOffres();
    } catch (error) {
      toast.error("Failed to delete job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setEditingId(null);
    setNewOffre({ titre: "", competance: "", domaine: "" });
  };

  // Fetch job offers
  const getOffres = async () => {
    setLoading(true);
    try {
      const response = await getOffresByRecruteur();
      setOffres(response.data || []);
    } catch (error) {
      toast.error("Error fetching job offers");
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle candidate visibility for an offer
  const toggleCandidates = (offreId) => {
    setVisibleCandidates(prev => ({
      ...prev,
      [offreId]: !prev[offreId]
    }));
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // Process candidates - sort by score
  const getSortedCandidates = (candidates) => {
    if (!candidates || candidates.length === 0) return [];
    
    return [...candidates].sort((a, b) => {
      const scoreA = a.cvAnalysis?.score ? parseInt(a.cvAnalysis.score) : 0;
      const scoreB = b.cvAnalysis?.score ? parseInt(b.cvAnalysis.score) : 0;
      return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });
  };

  useEffect(() => {
    getOffres();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            margin: "auto",
            background: 'white',
            color: 'black',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4BB543',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ff4d4f',
              secondary: '#fff',
            },
          },
          loading: {
            duration: Infinity,
          }
        }}
      />

      <Nav />
      <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"
      }`}>
        {/* Job Offer Form */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-3xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-6 text-gray-800">
                {editingId ? "Edit Job Offer" : "Create New Job Offer"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="titre"
                    value={newOffre.titre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <input
                    type="text"
                    name="domaine"
                    value={newOffre.domaine}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input
                    name="competance"
                    value={newOffre.competance}
                    onChange={handleChange}
            
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2 text-right mt-4 space-x-3">
                  {editingId ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-lightBlue-600 hover:bg-lightBlue-700 text-white font-bold text-sm px-6 py-2 rounded-md shadow-md"
                      >
                        Update
                      </button>
                      &nbsp;&nbsp;&nbsp;     <button
                        onClick={cancelEdit}
                        className="bg-lightBlue-600 hover:bg-gray-600 text-white font-bold text-sm px-6 py-2 rounded-md shadow-md"
                      >
                        Cancel
                      </button>
                      &nbsp;&nbsp;&nbsp;   </>
                  ) : (
                    <button
                      onClick={handleAddOffre}
                      className="bg-lightBlue-600 hover:bg-lightBlue-700 text-white font-bold text-sm px-6 py-2 rounded-md shadow-md"
                    >
                      Add Job Offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Offers List */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg">Job Offers</h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {["Title", "Skills", "Domain", "Actions"].map(header => (
                  <th 
                    key={header}
                    className={`px-6 py-3 text-xs uppercase font-semibold text-left ${
                      color === "light" ? "bg-lightBlue-600 text-bold text-white" : "bg-lightBlue-800 text-lightBlue-300"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offres.length > 0 ? (
                offres.map((offre) => (
                  <React.Fragment key={offre._id}>
                    <tr>
                      <td className="px-6 py-4 text-sm">{offre.titre}</td>
                      <td className="px-6 py-4 text-sm">{offre.competance}</td>
                      <td className="px-6 py-4 text-sm">{offre.domaine}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => toggleCandidates(offre._id)}
                          className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          {visibleCandidates[offre._id] ? "Hide" : "View" } Candidates
                        </button>
                  &nbsp;&nbsp;&nbsp;       <button
                          onClick={() => handleEdit(offre)}
                          className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Edit
                        </button>
                        &nbsp;&nbsp;&nbsp;    <button
                          onClick={() => handleDelete(offre._id)}
                          className="text-white bg-red-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {visibleCandidates[offre._id] && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">List of Candidates</h4>
                            <button
                              onClick={toggleSortOrder}
                              className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                            >
                              {sortOrder === 'desc' ? 'Highest Scores ↓' : 'Lowest Scores ↑'}
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {getSortedCandidates(offre.candidats).length > 0 ? (
                              getSortedCandidates(offre.candidats).map((candidate) => (
                                <div key={candidate._id} className="border rounded-lg p-4 bg-white shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-lg font-bold text-blue-800">{candidate.username}</h4>
                                    {candidate.cvAnalysis?.score && (
                                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        candidate.cvAnalysis.score >= 70 ? 'bg-green-100 text-green-800' :
                                        candidate.cvAnalysis.score >= 50 ? 'bg-yellow-100 text-yellow-500' :
                                        'text-red-500'
                                      }`}>
                                        Score: {candidate.cvAnalysis.score}
                                      </span>
                                    )}
                                  </div>
                                
                                    {candidate.cvAnalysis && (
                                      <div className="mt-3 border-t pt-3">
                                        {/* <h5 className="font-semibold text-gray-700 mb-1">CV Analysis</h5> */}
                                        <div className="mt-2">
                                          {/* <p className="font-medium">Summary:</p> */}
                                          <p className="text-gray-500">{candidate.cvAnalysis.summary || "No analysis available"}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                          <p><strong>Matched Skills:</strong> {candidate.cvAnalysis.matchedSkills?.join(", ") || "None"}</p>
                                          <p><strong>Missing Skills:</strong> {candidate.cvAnalysis.missingSkills?.join(", ") || "None"}</p>
                                          <p><strong>Compatibility:</strong> {candidate.cvAnalysis.isCompatible ? "True" : "False"}</p>
                                          <p><strong>Score:</strong> {candidate.cvAnalysis.score || "N/A"}</p>
                                        </div>
                                 
                                      </div>
                                      
                                    )}
                                      <div className="text-sm text-gray-800 space-y-1">
                                    <p><strong>Email:</strong> {candidate.email}</p>
                                    <p><strong>Phone:</strong> {candidate.telephone}</p>
                                    <p><strong>Current Position:</strong> {candidate.currentPosition}</p>
                                    <p><strong>Experience:</strong> {candidate.experiences}</p>
                                    {candidate.cvLink && (
                                      <div className="mt-2">
                                      <br/>  <a
                                          href={candidate.cvLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bg-lightBlue-600 hover:bg-lightBlue-700 text-white font-bold text-sm px-6 py-2 rounded-md shadow-md"
                                          >
                                          View CV
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 text-gray-500">
                                No candidates have applied yet
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No job offers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Recruiter.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};