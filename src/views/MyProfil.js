import React, { useState, useEffect } from "react";
import { updateProfil } from "../services/ApiUser";
import toast, { Toaster } from "react-hot-toast";
import FooterSmall from "components/Footers/FooterSmall.js";
import Nav from "components/CandidatNav/Nav.js";

export default function MyProfil() {
  const [competance, setCompetance] = useState("");
  const [email, setEmail] = useState("");
  const [experiences, setExperiences] = useState("");
  const [username, setUsername] = useState("");
  const [offres, setOffres] = useState("");
  const [telephone, setTelephone] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    competance: "",
    experiences: "",
    offres:"",
    telephone: "",
    currentPosition: "",
  });

 
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      
      setCompetance(user.competance || "");
      setExperiences(user.experiences || "");
      setOffres(user.offres || "");
      setTelephone(user.telephone || "");
      setCurrentPosition(user.currentPosition || "");
     
    }
  }, []);

  const formValidation = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", competance: "", experiences: "" };

    // if (!username) {
    //   newErrors.username = "Username requis";
    //   isValid = false;
    // }
    // if (!email) {
    //   newErrors.email = "Email requis";
    //   isValid = false;
    // }
    // if (!competance) {
    //   newErrors.competance = "Compétence requise";
    //   isValid = false;
    // }
    // if (!experiences) {
    //   newErrors.experiences = "Expérience requise";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const idUser = user?._id;

      const formData = {
        username,
        email,
        competance,
        currentPosition,
        experiences,
        telephone,
        offres
      };

      setLoading(true);
      try {
        const response = await updateProfil(idUser, formData);
        toast.success("Updated successfuly ");
        console.log("Profil mis à jour :", response.data);

        // Réinitialiser les erreurs
        setErrors({
          username: "",       telephone:''  , currentPosition:'',
          email: "",
          competance: "",
          experiences: "",
        });

  
        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      } catch (err) {
        toast.error(err.response?.data || "Erreur de mise à jour");
        console.error("Erreur lors de la mise à jour :", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Nav />
      <Toaster position="top-center"  />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-dark text-xl font-bold">MyProfile</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-lightBlue-500 text-sm mt-3 mb-6 font-bold uppercase">
              Informations Utilisateur
            </h6>

            <div className="flex flex-wrap">
              {/* Username */}
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="username" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Votre nom d'utilisateur"
                />
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              </div>

              {/* Email */}
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="email" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Adresse Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="email@example.com"
                />
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              </div>

              {/* Experiences */}
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="experiences" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Expériences
                </label>
                <input
                  id="experiences"
                  type="text"
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Expériences pro"
                />
                <p className="text-red-500 text-xs mt-1">{errors.experiences}</p>
              </div>

              {/* Competence */}
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="competance" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Compétences
                </label>
                <input
                  id="competance"
                  type="text"
                  value={competance}
                  onChange={(e) => setCompetance(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Vos compétences"
                />
                <p className="text-red-500 text-xs mt-1">{errors.competance}</p>
              </div>
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="competance" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              telephone
                </label>
                <input
                  id="telephone"
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="telephone "
                />
                <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
              </div>
              <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="competance" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                currentPosition
                </label>
                <input
                  id="currentPosition"
                  type="text"
                  value={currentPosition}
                  onChange={(e) => setCurrentPosition(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="telephone "
                />
                <p className="text-red-500 text-xs mt-1">{errors.currentPosition}</p>
              </div>


              {/* <div className="w-full lg:w-6/12 px-4 mb-4">
                <label htmlFor="competance" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Offres
                </label>
                <input
                  id="Offres"
                  type="text"
                  value={offres}
                  readOnly
                  onChange={(e) => setOffres(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Vos Offres"
                />
                <p className="text-red-500 text-xs mt-1">{errors.offres}</p>
              </div> */}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-lightBlue-300 cursor-not-allowed" : "bg-lightBlue-500 hover:bg-lightBlue-500"
                } text-white px-6 py-2 rounded shadow transition-all`}
              >
                {loading ? "Update" : "Update Info"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
