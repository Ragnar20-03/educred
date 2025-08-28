"use client";

import type React from "react";
import { useState, useEffect } from "react";

interface EducationRecord {
  id: number;
  level: string;
  institution: string;
  degree: string;
  year: number;
  percentage?: number;
  cgpa?: number;
  certificate?: string;
  points: number;
  coins: number;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  approvedDate?: string;
}

export const Education = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "view">("add");
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardData, setRewardData] = useState({ points: 0, coins: 0 });
  const [formData, setFormData] = useState({
    level: "",
    institution: "",
    degree: "",
    year: new Date().getFullYear(),
    percentage: "",
    cgpa: "",
    certificate: null as File | null,
  });

  // Education levels with their default points
  const educationLevels = [
    { value: "10th", label: "10th Standard/SSC", defaultPoints: 100 },
    { value: "12th", label: "12th Standard/HSC", defaultPoints: 120 },
    { value: "diploma", label: "Diploma", defaultPoints: 200 },
    { value: "btech", label: "B.Tech/B.E.", defaultPoints: 400 },
    { value: "bsc", label: "B.Sc", defaultPoints: 350 },
    { value: "bcom", label: "B.Com", defaultPoints: 300 },
    { value: "ba", label: "B.A", defaultPoints: 300 },
    { value: "mtech", label: "M.Tech/M.E.", defaultPoints: 500 },
    { value: "msc", label: "M.Sc", defaultPoints: 450 },
    { value: "mcom", label: "M.Com", defaultPoints: 400 },
    { value: "ma", label: "M.A", defaultPoints: 400 },
    { value: "mba", label: "MBA", defaultPoints: 600 },
    { value: "phd", label: "Ph.D", defaultPoints: 800 },
  ];

  // Mock previous education records
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([
    {
      id: 1,
      level: "btech",
      institution: "ABC Institute of Technology",
      degree: "Computer Science Engineering",
      year: 2023,
      percentage: 85,
      cgpa: 8.5,
      certificate: "btech-certificate.pdf",
      points: 400,
      coins: 160,
      status: "approved",
      submittedDate: "2024-01-10",
      approvedDate: "2024-01-12",
    },
    {
      id: 2,
      level: "12th",
      institution: "XYZ Higher Secondary School",
      degree: "Science Stream",
      year: 2019,
      percentage: 92,
      certificate: "12th-certificate.pdf",
      points: 120,
      coins: 48,
      status: "approved",
      submittedDate: "2024-01-05",
      approvedDate: "2024-01-07",
    },
    {
      id: 3,
      level: "mtech",
      institution: "DEF University",
      degree: "Data Science",
      year: 2024,
      cgpa: 9.2,
      certificate: "mtech-certificate.pdf",
      points: 500,
      coins: 200,
      status: "pending",
      submittedDate: "2024-01-15",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (
    field: string,
    value: string | File | null | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("certificate", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedLevel = educationLevels.find(
      (level) => level.value === formData.level
    );
    const points = selectedLevel?.defaultPoints || 0;
    const coins = Math.floor(points * 0.4);

    // Create new education record
    const newEducationRecord: EducationRecord = {
      id: educationRecords.length + 1,
      level: formData.level,
      institution: formData.institution,
      degree: formData.degree,
      year: formData.year,
      percentage: formData.percentage
        ? Number.parseFloat(formData.percentage)
        : undefined,
      cgpa: formData.cgpa ? Number.parseFloat(formData.cgpa) : undefined,
      certificate: formData.certificate?.name,
      points: points,
      coins: coins,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
    };

    // Add to education records list
    setEducationRecords((prev) => [newEducationRecord, ...prev]);

    // Show reward popup
    setRewardData({ points, coins });
    setShowRewardPopup(true);

    // Reset form
    setFormData({
      level: "",
      institution: "",
      degree: "",
      year: new Date().getFullYear(),
      percentage: "",
      cgpa: "",
      certificate: null,
    });

    // Switch to view tab after submission
    setTimeout(() => {
      setActiveTab("view");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: string) => {
    return educationLevels.find((l) => l.value === level)?.label || level;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div
        className={`transform transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("add")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "add"
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span>➕</span>
              <span>Add Education</span>
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "view"
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span>📚</span>
              <span>View Education ({educationRecords.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Education Form */}
      {activeTab === "add" && (
        <div
          className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-black mb-6">
            Add Education Record
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                required
              >
                <option value="">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Points Alert */}
            {formData.level && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-xl">✅</span>
                  <div>
                    <p className="text-green-800 font-semibold">
                      You will receive{" "}
                      {
                        educationLevels.find((l) => l.value === formData.level)
                          ?.defaultPoints
                      }{" "}
                      points and{" "}
                      {Math.floor(
                        (educationLevels.find((l) => l.value === formData.level)
                          ?.defaultPoints || 0) * 0.4
                      )}{" "}
                      EduCred coins
                    </p>
                    <p className="text-green-600 text-sm">
                      Points will be awarded after admin approval
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) =>
                  handleInputChange("institution", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                placeholder="Enter institution/school/college name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree/Stream/Specialization *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => handleInputChange("degree", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                placeholder="e.g., Computer Science, Science Stream, etc."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Completion *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    handleInputChange(
                      "year",
                      Number.parseInt(e.target.value) ||
                        new Date().getFullYear()
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                  min="1990"
                  max={new Date().getFullYear() + 5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage
                </label>
                <input
                  type="number"
                  value={formData.percentage}
                  onChange={(e) =>
                    handleInputChange("percentage", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="85.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CGPA
                </label>
                <input
                  type="number"
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange("cgpa", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="8.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate/Marksheet *
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload certificate, marksheet, or degree document (PDF, Image,
                or Document)
              </p>
            </div>

            <button
              type="submit"
              disabled={
                !formData.level ||
                !formData.institution ||
                !formData.degree ||
                !formData.certificate
              }
              className="w-full group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center">
                Submit Education Record
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  🎓
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      )}

      {/* View Education Records */}
      {activeTab === "view" && (
        <div
          className={`space-y-4 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {educationRecords.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="text-6xl opacity-20 mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Education Records Yet
              </h3>
              <p className="text-gray-600">
                Start by adding your first education record!
              </p>
            </div>
          ) : (
            educationRecords.map((record, index) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {getLevelLabel(record.level)}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-800 font-semibold mb-1">
                      {record.degree}
                    </p>
                    <p className="text-gray-600 mb-2">{record.institution}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>Year: {record.year}</span>
                      {record.percentage && (
                        <span>Percentage: {record.percentage}%</span>
                      )}
                      {record.cgpa && <span>CGPA: {record.cgpa}</span>}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Submitted:{" "}
                        {new Date(record.submittedDate).toLocaleDateString()}
                      </span>
                      {record.approvedDate && (
                        <span>
                          Approved:{" "}
                          {new Date(record.approvedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-green-600">
                          +{record.points}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">
                          +{record.coins}
                        </div>
                        <div className="text-xs text-gray-500">coins</div>
                      </div>
                    </div>
                    {record.certificate && (
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reward Popup */}
      {showRewardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 w-full max-w-md text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
            </div>

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-bounce">🎓</div>
              <h2 className="text-2xl font-bold text-black mb-2">
                Education Record Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Your education record has been submitted for review.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
                  <span className="text-green-600 animate-pulse">
                    +{rewardData.points}
                  </span>
                  <span className="text-gray-600">⭐</span>
                  <span className="text-gray-600">Points</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xl font-bold">
                  <span className="text-blue-600 animate-pulse">
                    +{rewardData.coins}
                  </span>
                  <span className="text-gray-600">🪙</span>
                  <span className="text-gray-600">EduCred</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Rewards will be credited once your education record is approved
                by the admin.
              </p>

              <button
                onClick={() => setShowRewardPopup(false)}
                className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
