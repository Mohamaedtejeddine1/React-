import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOffres } from "../services/ApiOffres";
import Navbar from "components/CandidatNav/Nav.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");

  const getOffres = async () => {
    try {
      setLoading(true);
      const response = await getAllOffres();
      setOffres(response.data || []);
    } catch (error) {
      console.error("Error fetching offers:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffres();
  }, []);

  // Filter offers based on search term and domain
  const filteredOffres = offres.filter(offre => {
    const matchesSearch =
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.competance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.domaine.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = filterDomain === "all" || offre.domaine === filterDomain;

    return matchesSearch && matchesDomain;
  });

  // Extract unique domains for filter dropdown
  const domains = ["all", ...new Set(offres.map(offre => offre.domaine))];

  return (
    <>
      <Navbar transparent />
      <main>
        {/* Hero Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/business-job-interview-concept_1421-77.jpg?t=st=1747148285~exp=1747151885~hmac=a4006c5502c5b613ab24ca4c8cee0058be6eb6bc1ff39a25d4f60f7a58907c64&w=1380')",
            }}
          >
            <span className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>

          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-0">
                  <h1 className="text-white font-bold text-4xl mb-6">
                    Find Your Dream Job Today
                  </h1>
                  <p className="mt-4 text-xl font-bold  mb-8 text-white">
                    Browse through our latest job offers and take the next step in your career
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <section className="relative py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-10/12 px-4">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-8/12 px-3 mb-6 md:mb-0">
                      <input
                        type="text"
                        placeholder="Search by job title, skills, or domain..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-4/12 px-3">
                      <select
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        value={filterDomain}
                        onChange={(e) => setFilterDomain(e.target.value)}
                      >
                        {domains.map((domain, index) => (
                          <option key={index} value={domain}>
                            {domain === "all" ? "All Domains" : domain}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Offers Section */}
        <section className="pb-20 bg-gray-100 -mt-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg text-gray-600">Loading job offers...</p>
              </div>
            ) : filteredOffres.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-4">
                {filteredOffres.map((offre, index) => (
                  <div key={index} className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg h-full">
                        <div className="px-4 py-5 flex-auto flex flex-col justify-between h-full">
                          <div>
                            <h6 className="text-xl font-semibold"><b>Title:</b> {offre.titre}</h6>
                            <p className="mt-2 mb-1 text-blueGray-500 truncate"><b>Skills:</b> {offre.competance}</p>
                            <p className="mt-1 mb-4 text-blueGray-500 overflow-hidden">
                              <b>Description:</b> {offre.description}
                            </p>                         
                               <p className="mt-1 mb-1 text-blueGray-500"><b>Domain:</b> {offre.domaine}</p>

                            <p className="mt-0 mb-1 text-blueGray-500"><b>Status:</b> {offre.status}</p>
                        <b >Posted By: </b>  <p className="mt-0 mb-2 text-lightBlue-600 text-center truncate"> {offre.recrut.email}</p> 
                          </div>
                          <Link
                            to={{
                              pathname: "/FormCandidat",
                              state: { selectedOffreId: offre._id },
                            }}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-center"
                          >
                            <button type="button" className="font-bold">
                              Apply Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}