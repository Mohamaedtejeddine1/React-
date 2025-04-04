import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllOffres } from "../services/ApiOffres";
// Import image properly
import Nav from "components/CandidatNav/Nav";

export default function Recruiter({ color }) {
  const [offres, setOffres] = useState([]);

  const getOffres = async () => {
    try {
        const response = await getAllOffres();
        console.log("Full API Response:", response); // Log full response
        console.log("Data Received:", response.data); // Check what data is received

        setOffres(response.data || []); // Ensure response data exists
    } catch (error) {
        console.error("Error fetching offers:", error.response ? error.response.data : error.message);
    }
};


  useEffect(() => {
    getOffres();
  }, []);

  return (
  
    
    <div

     
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
     <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <Nav/>  
             </div>
      <div className="rounded-t mt-9 mb-0 px-4 py-3 border-2">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={
                "font-semibold text-lg " + (color === "light" ? "text-blueGray-200" : "text-white")
              }
            >
              List of Job Offers
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Title
              </th>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Description
              </th>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Competence
              </th>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Domain
              </th>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Department
              </th>
              <th
                className={
                  "px-6 py-3 text-xs uppercase font-semibold text-left border border-solid " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {offres.map((offre, index) => (
              <tr key={index}>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap text-left flex items-center">

                  <span className={"ml-3 font-bold " + (color === "light" ? "text-blueGray-600" : "text-white")}>
                    {offre.titre}
                  </span>
                </td>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap">{offre.description}</td>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap">{offre.competance}</td>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap">{offre.domaine}</td>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap">{offre.departement}</td>
                <td className="border-t-0 px-6 py-3 text-xs whitespace-nowrap">{offre.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Recruiter.defaultProps = {
  color: "dark",
};

Recruiter.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
