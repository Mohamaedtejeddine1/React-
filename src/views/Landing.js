import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getAllUsers } from "services/ApiUser";
import { getAllOffres } from "../services/ApiOffres"
import { useHistory } from "react-router-dom";
import Navbar from "components/CandidatNav/Nav.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [offres, setOffres] = useState([]); // Initialize as an empty array
  const getOffres = async () => {
    try {
      const response = await getAllOffres();
      console.log("res api:", response);
      console.log("Data tji", response.data);

      setOffres(response.data || []);
    } catch (error) {
      console.error("Error fetching offers:", error.response ? error.response.data : error.message);
    }
  };


  useEffect(() => {
    getOffres();
  }, []);





  //   const [users, setUsers] = useState([]); // Initialize as an empty array


  // const getUsers = async () => {
  //   try {
  //     const response = await getAllUsers();
  //     console.log("API Response:", response.data); // Log the full response
  //     setUsers(response.data.userListe || []); // Fallback to an empty array if userListe is undefined
  //   } catch (error) {
  //     console.error("Error fetching users:", error.response ? error.response.data : error.message);
  //   }
  // };
  //   useEffect(() => {
  //     getUsers();
  //   }, []);




  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-55 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/ti/photos-gratuite/p1/2909918-nouveau-concept-de-gestion-des-ressources-humaines-rh-team-building-and-recruitment-photo.jpg')",
            }}
          >
            {/* <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span> */}
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">

                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >

          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {offres.map((offre, index) => (
                <div key={index} className="lg:pt-12 pt-6 w-full md:w-4/12 px-4  text-left">
                  <div className="relative flex flex-col min-w-2 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      {/* <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div> */}
                      <h6 className="text-xl font-semibold"><b > Titre:</b> {offre.titre}</h6>
                      <p className="mt-2 mb-4 text-blueGray-500"><b> competance :</b>   {offre.competance}</p>
                      <p className="mt-2 mb-4 text-blueGray-500"><b>Domaine: </b>{offre.domaine}</p>
                      <p className="mt-2 mb-4  text-center text-lightBlue-600">
                 {offre.recrut.email}
                      </p>

                      {/* <p className="mt-2 mb-4 text-blueGray-500"><b>competance:</b> {offre.competance}</p>
                      <p className="mt-2 mb-4 text-blueGray-500"><b>Domaine: </b>{offre.domaine}</p>
                      <p className="mt-2 mb-4 text-blueGray-500"><b>Departement:</b>{offre.departement}</p> */}


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

              ))}
            </div>





          </div>
        </section>





      </main>
      <Footer />
    </>
  );
}