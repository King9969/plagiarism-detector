import React, { useState } from "react";
import axios from "axios";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [inputText, setInputText] = useState("");
  const [plagiarismReport, setPlagiarismReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleGenerateReport = async () => {
    setIsLoading(true);

    const options = {
      method: "POST",
      url: "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "78511c49b3msh2f58007da81da20p16ab40jsn70bc07dee00c",
        "X-RapidAPI-Host":
          "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
      },
      data: {
        text: inputText,
        language: "en",
        includeCitations: false,
        scrapeSources: false,
      },
    };

    try {
      const response = await axios.request(options);
      setPlagiarismReport(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center py-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-2xl w-full  rounded-lg shadow-md p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-semibold mb-4 text-center ${
            isDarkMode ? "text-white" : ""
          }`}
        >
          Plagiarism Checker
        </h1>
        <textarea
          rows="10"
          placeholder="Enter text here..."
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
            isDarkMode ? "bg-gray-700 border-gray-700" : "bg-gray-100"
          }`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          onClick={handleGenerateReport}
          className={`mt-4 w-full px-6 py-2 rounded-md ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } focus:outline-none focus:ring`}
          disabled={isLoading}
        >
          {isLoading ? "Generating Report..." : "Generate Report"}
        </button>
        {plagiarismReport && (
          <div
            className={`mt-6 p-4 rounded-md shadow-md ${
              isDarkMode ? "bg-gray-900" : "bg-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              Plagiarism Report
            </h2>
            <p className="">
              Plagiarism :{" "}
              <span
                className={`${
                  plagiarismReport.percentPlagiarism < 20
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }`}
              >
                {plagiarismReport.percentPlagiarism}%
              </span>
            </p>
            <p className="mb-2">
              Sources:
              {plagiarismReport.sources.map((source, index) => (
                <div key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    {source.url}
                  </a>
                </div>
              ))}
            </p>
          </div>
        )}
      </div>
      <button
        className={`mt-4 px-4 py-2  rounded ${
          isDarkMode
            ? "bg-gray-700 hover:bg-gray-800 text-white"
            : "bg-gray-300 hover:bg-gray-400 text-gray-800"
        } focus:outline-none focus:ring`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="fixed inset-x-0 bottom-0 p-4 z-10   max-w-xl mx-auto">
        <div className="rounded bg-blue-500  px-4 py-3 text-white shadow-lg">
          <p className="text-center text-sm font-medium">
            Love My Projects ?
            <a href="http://ry4.rf.gd/" className="inline-block underline">
              Contact Me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
