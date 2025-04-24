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

export default function Recruiter({ color }) {
  const [offres, setOffres] = useState([]);
  const [newoffres, setNewoffres] = useState({
    titre: "",
    description: "",
    domaine: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [visibleCandidates, setVisibleCandidates] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewoffres({ ...newoffres, [name]: value });
  };

  const AddNewOffres = async () => {
    const toastId = toast.loading("Creating job offer...");
    try {
      await createOffre(newoffres);
      toast.success("Job offer created successfully!", { id: toastId });
      getOffres();
      setNewoffres({ titre: "", description: "", domaine: "" });
    } catch (error) {
      toast.error("Failed to create job offer.", { id: toastId });
      console.error("Error:", error);
    }
  };

  const handleEdit = (offre) => {
    setEditingId(offre._id);
    setNewoffres({
      titre: offre.titre,
      description: offre.description,
      domaine: offre.domaine
    });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating job offer...");
    try {
      await updateOffre(editingId, newoffres);
      toast.success("Job offer updated successfully!", { id: toastId });
      getOffres();
      setEditingId(null);
      setNewoffres({ titre: "", description: "", domaine: "" });
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
    setNewoffres({ titre: "", description: "", domaine: "" });
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
            margin:"auto",
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
                    placeholder="Title"
                    name="titre"
                    value={newoffres.titre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <input
                    type="text"
                    placeholder="Domain"
                    name="domaine"
                    value={newoffres.domaine}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    value={newoffres.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2 text-right mt-4 space-x-3">
                  {editingId ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="  font-bold uppercase text-sm px-6 py-2 rounded-md shadow-md transition duration-200"
                      >
                        Update
                      </button>
                     
                    </>
                  ) : (
                    <button
                      onClick={AddNewOffres}
                      className="bg-lightBlue-600 hover:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-2 rounded-md shadow-md transition duration-200"
                    >
                      Add Job Offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg">List of Job Offers</h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {["Title", "Description", "Domain", "Actions"].map(header => (
                  <th key={header} className={`px-6 py-3 text-xs uppercase font-semibold text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500"
                      : "bg-lightBlue-800 text-lightBlue-300"
                  }`}>
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
                      <td className="border-t-0 px-6 py-4 text-sm">{offre.titre}</td>
                      <td className="border-t-0 px-6 py-4 text-sm">{offre.description}</td>
                      <td className="border-t-0 px-6 py-4 text-sm">{offre.domaine}</td>
                      <td className="border-t-0 px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => toggleCandidates(offre._id)}
                          className="text-white bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          {visibleCandidates[offre._id] ? "Hide" : "View"} Candidates
                        </button>&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;<button
                          onClick={() => handleEdit(offre)}
                          className="text-white bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Edit
                          
                          </button>
                          &nbsp;&nbsp;&nbsp;
                        <button
                          onClick={() => handleDelete(offre._id)}
                          className="text-white bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {visibleCandidates[offre._id] && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 bg-gray-100">
                          <div className="grid grid-cols-1 gap-6">
                            {offre.candidats?.length > 0 ? (
                              offre.candidats.map((candidate) => (
                                <div key={candidate._id} className="border rounded-xl p-5 bg-white shadow-sm">
                                  <div className="text-sm text-gray-800">
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="text-lg font-bold text-blue-800">{candidate.username}</h4>
                                      <span className="text-xs italic">
                                        Applied At: {new Date(candidate.appliedAt).toLocaleString()}
                                      </span>
                                    </div>
                                    <p><strong>Email:</strong> {candidate.email}</p>
                                    <p><strong>Skills:</strong> {candidate.competance}</p>
                                    <p><strong>Experience:</strong> {candidate.experiences}</p>
                                    <p><strong>Current Position:</strong> {candidate.currentPosition}</p>
                                    <p><strong>Motivation Letter:</strong> {candidate.Motivationletter}</p>
                                    {candidate.cvLink && (
                                      <div className="mt-3">
                                        <a
                                          href={candidate.cvLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bg-lightBlue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                          Download CV
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-gray-500">No candidates yet</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
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

Recruiter.defaultProps = {
  color: "light",
};

Recruiter.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};