import { useState } from "react";
import { Upload, FileText, Check, AlertTriangle, Loader, X, FileSymlink, Share2 } from "lucide-react";

const Diagnosis = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [apiReport, setApiReport] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReport(file);
    }
  };

  const handleDiagnosis = () => {
    if (!report) {
      alert("Please upload a report first!");
      return;
    }
    setLoading(true);
    setResult(null);
    setApiReport(null);

    // API integration will be added here later
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setReport(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setReport(null);
    setResult(null);
    setApiReport(null);
  };

  return (
      <div className="min-h-screen flex bg-gray-900 text-white">
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">AI Diagnosis</h1>
                <p className="text-gray-400">
                  Upload your medical reports for AI-powered analysis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h2 className="text-xl font-medium flex items-center">
                    <FileText size={20} className="mr-2 text-blue-400" />
                    Upload Medical Report
                  </h2>
                </div>

                <div className="p-6">
                  <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 flex flex-col items-center justify-center ${
                          dragActive
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-gray-600 hover:border-blue-400 hover:bg-gray-800/30"
                      }`}
                  >
                    {!report ? (
                        <>
                          <Upload size={40} className="text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-white mb-2">
                            Drag and drop your file here
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 text-center">
                            Supported formats: PDF, JPG, DICOM, PNG
                          </p>
                          <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg transition duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                            Browse Files
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".pdf,.jpg,.jpeg,.png,.dcm"
                            />
                          </label>
                        </>
                    ) : (
                        <div className="w-full">
                          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <FileText size={20} className="text-blue-400" />
                              </div>
                              <div className="truncate">
                                <p className="text-white font-medium truncate">
                                  {report.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {(report.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-1 bg-gray-600 rounded-full hover:bg-gray-500 transition duration-200"
                            >
                              <X size={16} className="text-gray-300" />
                            </button>
                          </div>

                          <button
                              onClick={handleDiagnosis}
                              disabled={loading}
                              className={`w-full mt-4 py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                                  loading
                                      ? "bg-gray-700 cursor-not-allowed"
                                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30"
                              }`}
                          >
                            {loading ? (
                                <>
                                  <Loader size={18} className="animate-spin mr-2" />
                                  Analyzing Report...
                                </>
                            ) : (
                                "Run AI Diagnosis"
                            )}
                          </button>
                        </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h2 className="text-xl font-medium">Diagnosis Results</h2>
                </div>

                <div className="p-6">
                  {result ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              Analysis Complete
                            </h3>
                            <p className="text-gray-300 text-sm">
                              Report analyzed successfully
                            </p>
                          </div>
                          <div className="px-3 py-1 rounded-full flex items-center bg-green-500/20 text-green-400">
                            <Check size={16} className="mr-1" /> Normal
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Findings</h4>
                          <ul className="space-y-2">
                            <li className="bg-gray-700/50 p-3 rounded-lg flex items-start">
                              <Check size={16} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">Findings will be shown here</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <FileText size={48} className="text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">
                          No Results Yet
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Upload a medical report and run AI diagnosis to see results here
                        </p>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Diagnosis;
