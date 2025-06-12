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
    domaine: "",
    description: "",
    status: "open" // Added status field with default value
  });
  const [editingId, setEditingId] = useState(null);
  const [visibleCandidates, setVisibleCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffre(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOffre = async () => {
    const toastId = toast.loading("Creating job offer...");
    try {
      await createOffre(newOffre);
      toast.success("Job offer created successfully!", { id: toastId });
      getOffres();
      setNewOffre({ 
        titre: "", 
        competance: "", 
        domaine: "",
        description: "",
        status: "open"
      });
    } catch (error) {
      toast.error("Failed to create job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

  const handleEdit = (offre) => {
    setEditingId(offre._id);
    setNewOffre({
      titre: offre.titre,
      competance: offre.competance,
      domaine: offre.domaine,
      description: offre.description || "",
      status: offre.status || "open"
    });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating job offer...");
    try {
      await updateOffre(editingId, newOffre);
      toast.success("Job offer updated successfully!", { id: toastId });
      getOffres();
      setEditingId(null);
      setNewOffre({ 
        titre: "", 
        competance: "", 
        domaine: "",
        description: "",
        status: "open"
      });
    } catch (error) {
      toast.error("Failed to update job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

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

  const cancelEdit = () => {
    setEditingId(null);
    setNewOffre({ 
      titre: "", 
      competance: "", 
      domaine: "",
      description: "",
      status: "open"
    });
  };

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

  const toggleCandidates = (offreId) => {
    setVisibleCandidates(prev => ({
      ...prev,
      [offreId]: !prev[offreId]
    }));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const getSortedCandidates = (candidates) => {
    if (!candidates || candidates.length === 0) return [];
    
    return [...candidates].sort((a, b) => {
      const scoreA = a.cvAnalysis?.score ? parseInt(a.cvAnalysis.score) : 0;
      const scoreB = b.cvAnalysis?.score ? parseInt(b.cvAnalysis.score) : 0;
      return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });
  };
  const splitCandidates = (candidates) => {
    const half = Math.ceil(candidates.length / 2);
    return {
      left: candidates.slice(0, half),
      right: candidates.slice(half)
    };
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newOffre.description}
                    onChange={handleChange}
                    rows="2"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={newOffre.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
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
                     &nbsp;&nbsp;&nbsp; <button
                        onClick={cancelEdit}
                        className="bg-lightBlue-600 hover:bg-gray-600 text-white font-bold text-sm px-6 py-2 rounded-md shadow-md"
                      >
                        Cancel
                      </button>
                    </>
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
                {["Title", "Skills", "Domain", "Status", "Actions"].map(header => (
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
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          offre.status === "open" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {offre.status === "open" ? "Open" : "Closed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => toggleCandidates(offre._id)}
                          className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          {visibleCandidates[offre._id] ? "Hide" : "View"} Candidates
                        </button>
                     &nbsp;&nbsp;&nbsp;   <button
                          onClick={() => handleEdit(offre)}
                          className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Edit
                        </button>
                       &nbsp;&nbsp; <button
                          onClick={() => handleDelete(offre._id)}
                          className="text-white bg-red-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {visibleCandidates[offre._id] && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 bg-gray-50">
                          <div className="mb-4">
                            {offre.description && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-1">Job Description:</h4>
                                <p className="text-sm text-gray-600">{offre.description}</p>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <h4 className="text-lg font-semibold">List of Candidates</h4>
                              <button
                                onClick={toggleSortOrder}
                                className="text-white bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md"
                              >
                                {sortOrder === 'desc' ? 'Highest Scores ↓' : 'Lowest Scores ↑'}
                              </button>
                            </div>
                          </div>
                          
                          {/* Split candidate display */}
                          <div className="flex flex-col md:flex-row gap-6">
                            {(() => {
                              const sortedCandidates = getSortedCandidates(offre.candidats);
                              const { left, right } = splitCandidates(sortedCandidates);
                              
                              return (
                                <>
                                  <div className="flex-1 space-y-4">
                                    {left.length > 0 ? (
                                      left.map((candidate) => (
                                        <CandidateCard key={candidate._id} candidate={candidate} />
                                      ))
                                    ) : (
                                      <div className="text-center py-4 text-gray-500">
                                        No candidates in this column
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 space-y-4">
                                    {right.length > 0 ? (
                                      right.map((candidate) => (
                                        <CandidateCard key={candidate._id} candidate={candidate} />
                                      ))
                                    ) : (
                                      <div className="text-center py-4 text-gray-500">
                                        No candidates in this column
                                      </div>
                                    )}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          
                          {offre.candidats?.length === 0 && (
                            <div className="text-center py-4 text-gray-500">
                              No candidates have applied yet
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
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

// Extracted Candidate Card Component for better readability
function CandidateCard({ candidate }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'green' }}>
          Candidate Information
        </h4>
        {candidate.cvAnalysis?.score && (
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            candidate.cvAnalysis.score >= 70 ? 'bg-lightBlue-200 text-green-800' :
            candidate.cvAnalysis.score >= 50 ? 'bg-red-200 text-yellow-500' :
            'text-red-500'
          }`}>
            Score: {candidate.cvAnalysis.score}
          </span>
        )}
      </div>
      
      <div className="text-sm text-gray-800 space-y-1">
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone:</strong> {candidate.telephone}</p>
        <p><strong>Experience:</strong> {candidate.experiences}</p>
        <p><strong>competance:</strong> {candidate.competance}</p>
      </div>
      
      {candidate.cvAnalysis && (
        <div className="mt-3 border-t pt-3">
          <div className="mt-2">
            <p className="text-white-500 bg-lightBlue-200">{candidate.cvAnalysis.summary || "No analysis available"}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <p><strong>Matched Skills:</strong> {candidate.cvAnalysis.matchedSkills?.join(", ") || "None"}</p>
            <p><strong>Missing Skills:</strong> {candidate.cvAnalysis.missingSkills?.join(", ") || "None"}</p>
            <p><strong>Compatibility:</strong> {candidate.cvAnalysis.isCompatible ? "True" : "False"}</p>
          </div>
        </div>
      )}
      
      {candidate.cvLink && (
        <div className="mt-3 text-center">
          <a
            href={candidate.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-lightBlue-600 hover:bg-lightBlue-700 text-white font-bold text-sm px-4 py-2 rounded-md shadow-md"
          >
            View CV
          </a>
        </div>
      )}
    </div>
  );
}

Recruiter.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};