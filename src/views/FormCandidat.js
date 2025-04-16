import React, { useState } from "react";
import axios from "axios";
import Nav from "components/CandidatNav/Nav";
import { updateCandidatDetails } from "../services/ApiUser"; 

export default function FormCandidat() {
  const [competance, setCompetance] = useState("");
  const [experiences, setExperiences] = useState("");
  const [cv, setCv] = useState(null);     
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    competance: "",
    experiences: "",
  });

  const formValidation = () => {
    let isValid = true;
    let newErrors = { competance: "", experiences: "" };

    if (!competance.trim()) {
      newErrors.competance = "Compétence requise";
      isValid = false;
    }
    if (!experiences.trim()) {
      newErrors.experiences = "Expérience requise";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle file change (for CV)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file); // Log the file to check if it's selected

    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(file.type)) {
        setErrorMessage("Seuls les fichiers PDF et Word sont acceptés");
        e.target.value = ""; // Clear the file input
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("La taille du fichier ne doit pas dépasser 5MB");
        e.target.value = ""; // Clear the file input
        return;
      }

      setCv(file);  // Save the file
      setErrorMessage("");  // Reset error message
    }
  };

  // Handle form submission (update candidat details)
  const handleUpdateCandidatDetails = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!formValidation()) return;

    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      setErrorMessage("Utilisateur non authentifié");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("competance", competance);
    formData.append("experiences", experiences);
    if (cv) {
      formData.append("cv", cv);  // Append file if selected
    }

    try {
      const response = await updateCandidatDetails(user._id, formData);

      if (response.status === 200 || response.status === 201) {
        setCompetance("");
        setExperiences("");
        setCv(null);
        setSuccessMessage("Vos informations ont été mises à jour avec succès!");

        if (response.data.updatedUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              ...response.data.updatedUser,
            })
          );
        }
      } else {
        setErrorMessage("Réponse inattendue du serveur");
      }
    } catch (err) {
      console.error("Update error:", err);
      if (err.response) {
        if (err.response.status === 404) {
          setErrorMessage("Endpoint non trouvé - vérifiez la connexion API");
        } else {
          setErrorMessage(
            err.response.data?.error || `Erreur du serveur (${err.response.status})`
          );
        }
      } else if (err.request) {
        setErrorMessage("Pas de réponse du serveur - vérifiez votre connexion");
      } else {
        setErrorMessage("Erreur lors de la configuration de la requête");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-lightBlue-600 mb-6 text-center">
            Apply Now
          </h2>

          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={handleUpdateCandidatDetails}
            encType="multipart/form-data"
          >
            {/* Compétence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compétence
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.competance ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ex: Développement Web"
                value={competance}
                onChange={(e) => setCompetance(e.target.value)}
              />
              {errors.competance && (
                <p className="text-red-500 text-sm mt-1">{errors.competance}</p>
              )}
            </div>

            {/* Expérience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expérience
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.experiences ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ex: 2 ans"
                value={experiences}
                onChange={(e) => setExperiences(e.target.value)}
              />
              {errors.experiences && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experiences}
                </p>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Télécharger votre CV (PDF ou Word, max 5MB)
              </label>
              <input
                type="file"
                className="w-full text-sm"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                key={cv ? cv: "file-input"} 
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-lightBlue-600 text-white py-2 px-4 rounded hover:bg-lightBlue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
