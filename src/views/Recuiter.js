import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllOffres } from "../services/ApiOffres";
import Nav from "components/CandidatNav/RecuiterNav";


export default function Recruiter({ color }) {
  const [offres, setOffres] = useState([]);
  const [visibleCandidates, setVisibleCandidates] = useState({});
  const [loading, setLoading] = useState(true);

  const getOffres = async () => {
    try {
      const response = await getAllOffres();
      console.log("API Response:", response); // Debug log
      setOffres(response.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffres();
  }, []);

  const toggleCandidates = (offreId) => {
    console.log("Toggling:", offreId); // Debug log
    setVisibleCandidates(prev => ({
      ...prev,
      [offreId]: !prev[offreId]
    }));
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
      <Nav />
      <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"
      }`}>
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
                {["Title", "Description", "Domain", "Actions"].map((header) => (
                  <th
                    key={header}
                    className={`px-6 py-3 text-xs uppercase font-semibold text-left ${
                      color === "light"
                        ? "bg-blueGray-50 text-blueGray-500"
                        : "bg-lightBlue-800 text-lightBlue-300"
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
                      <td className="border-t-0 px-6 py-4 align-middle text-sm whitespace-nowrap">
                        {offre.titre}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-sm">
                        {offre.description}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-sm">
                        {offre.domaine}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-sm">
                        <button
                          className={` text-white bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                          onClick={() => toggleCandidates(offre._id)}
                        >
                          {visibleCandidates[offre._id] ? "Hide" : "View"} 
                        </button>
                      </td>
                    </tr>
                    {visibleCandidates[offre._id] && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div className="text-sm">
                            {offre.candidats?.length > 0 ? (
                              offre.candidats.map((candidate) => (
                                <div key={candidate._id} className="mb-4 p-3 border-b">
                                  <h4 className="font-bold">{candidate.username}</h4>
                                  <p>Email: {candidate.email}</p>
                                  <p>Skills: {candidate.competance}</p>
                                  <p>Number of years of experience : {candidate.experiences}</p>
                                  <p>Current Position: {candidate.currentPosition}</p>
                                  <p>Motivation letter {candidate.Motivationletter}</p>
                                  <span>Applied At: {new Date(candidate.appliedAt).toLocaleString()}</span>
                                  

                                </div>
                              ))
                            ) : (
                              <p>No candidates yet</p>
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