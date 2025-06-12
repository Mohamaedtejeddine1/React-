// src/components/ExtractAndGenerate.js

import React, { useState } from "react";
import Nav from 'components/CandidatNav/RecuiterNav';
import Sidebar2 from 'components/Sidebar/sidebar2';

import toast, { Toaster } from 'react-hot-toast';

export default function ExtractAndGenerate() {
  const [cvUrl, setCvUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState(null);

  const handleExtractSummary = async () => {
    setLoadingSummary(true);
    setError(null);
    setSummary("");
    setQuestions([]);
    try {
      const res = await fetch("http://localhost:5000/users/extractSummaryFromCloudinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvUrl }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSummary(data.summary);
      } else {
        setError(data.message || "Failed to extract summary");
        toast.error(data.message || "Failed to extract summary");
      }
    } catch (err) {
      setError("Network error extracting summary");
      toast.error("Network error extracting summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!summary) {
      setError("Please extract CV summary first.");
      toast.error("Please extract CV summary first.");
      return;
    }
    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      toast.error("Please enter a job title.");
      return;
    }

    setLoadingQuestions(true);
    setError(null);
    setQuestions([]);
    try {
      const res = await fetch("http://localhost:5000/Gemini/generateInterviewQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, candidateSummary: summary }),
      });
      const data = await res.json();
      if (res.ok && data.questions) {
        setQuestions(data.questions);
      } else {
        setError(data.message || "Failed to generate questions");
        toast.error(data.message || "Failed to generate questions");
      }
    } catch (err) {
      setError("Network error generating questions");
      toast.error("Network error generating questions");
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Toaster />
      <Sidebar2 />
      <div className="flex-1 overflow-auto">
        <Nav />
        <div className="container mx-auto pl-8 ml-0 md:ml-64 p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
      Generate interview questions
          </h2>

          <div className="mb-6 max-w-xl">
            <label className="block font-semibold mb-2">
              URL PDF CV (Cloudinary):
            </label>
            <input
              type="text"
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/your-cv-url.pdf"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleExtractSummary}
              disabled={loadingSummary || !cvUrl.trim()}
              className="mt-3 px-4 py-2 bg-lightBlue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingSummary ? "Extraction..." : "Extract summary"}
            </button>
          </div>

          {summary && (
            <div
              className="mb-6 p-4 bg-gray-100 rounded whitespace-pre-wrap max-w-xl"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <strong>Extract summary:</strong>
              <p className="mt-2">{summary}</p>
            </div>
          )}

          <div className="mb-6 max-w-xl">
            <label className="block font-semibold mb-2">Job Offer:</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Ex: Développeur Frontend"
              disabled={!summary}
              className="w-full p-2 border border-lightBlue-600 rounded disabled:bg-gray-200"
            />
            <button
              onClick={handleGenerateQuestions}
              disabled={loadingQuestions || !jobTitle.trim() || !summary}
              className="mt-3 px-4 py-2 bg-lightBlue-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loadingQuestions ? "Génération..." : "Generate interview questions"}
            </button>
          </div>

          {questions.length > 0 && (
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold mb-3">Generate interview questions</h3>
              <ol className="list-decimal ml-5 space-y-2 max-h-[600px] overflow-y-auto">
                {questions.map((q, i) => (
                  <li
                    key={i}
                    className="p-3 border rounded shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => toast(q)}
                    title="Cliquer pour afficher la question"
                  >
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {error && (
            <div className="mt-6 text-red-600 font-semibold">
              <strong>Erreur : </strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
