"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface Achievement {
  id: number;
  type: string;
  name: string;
  certificate?: string;
  points: number;
  coins: number;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  approvedDate?: string;
}

export const Achievements = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "view">("add");
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardData, setRewardData] = useState({ points: 0, coins: 0 });
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    certificate: null as File | null,
  });

  // Achievement types with their default points
  const achievementTypes = [
    { value: "hackathon", label: "Hackathon", defaultPoints: 200 },
    { value: "seminar", label: "Seminar", defaultPoints: 50 },
    { value: "workshop", label: "Workshop", defaultPoints: 75 },
    { value: "competition", label: "Competition", defaultPoints: 150 },
    {
      value: "certification-course",
      label: "Certification Course",
      defaultPoints: 100,
    },
    {
      value: "paper-presentation",
      label: "Paper Presentation",
      defaultPoints: 125,
    },
    { value: "internship", label: "Internship", defaultPoints: 300 },
    {
      value: "event-volunteering",
      label: "Event Volunteering",
      defaultPoints: 80,
    },
    {
      value: "club-participation",
      label: "Club Participation",
      defaultPoints: 60,
    },
    {
      value: "open-source",
      label: "Open Source Contribution",
      defaultPoints: 120,
    },
  ];

  // Mock previous achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      type: "hackathon",
      name: "Web3 Innovation Hackathon 2024",
      certificate: "hackathon-cert.pdf",
      points: 200,
      coins: 80,
      status: "approved",
      submittedDate: "2024-01-10",
      approvedDate: "2024-01-12",
    },
    {
      id: 2,
      type: "certification-course",
      name: "Advanced React Development",
      certificate: "react-cert.pdf",
      points: 100,
      coins: 40,
      status: "approved",
      submittedDate: "2024-01-05",
      approvedDate: "2024-01-07",
    },
    {
      id: 3,
      type: "workshop",
      name: "AI/ML Workshop Series",
      certificate: "ml-workshop.pdf",
      points: 75,
      coins: 30,
      status: "pending",
      submittedDate: "2024-01-15",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("certificate", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedType = achievementTypes.find(
      (type) => type.value === formData.type
    );
    const points = selectedType?.defaultPoints || 0;
    const coins = Math.floor(points * 0.4);

    // Create new achievement
    const newAchievement: Achievement = {
      id: achievements.length + 1,
      type: formData.type,
      name: formData.name,
      certificate: formData.certificate?.name,
      points: points,
      coins: coins,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
    };

    // Add to achievements list
    setAchievements((prev) => [newAchievement, ...prev]);

    // Show reward popup
    setRewardData({ points, coins });
    setShowRewardPopup(true);

    // Reset form
    setFormData({ type: "", name: "", certificate: null });

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

  const getTypeLabel = (type: string) => {
    return achievementTypes.find((t) => t.value === type)?.label || type;
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
              <span>Add Achievement</span>
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "view"
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span>📋</span>
              <span>View Achievements ({achievements.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Achievement Form */}
      {activeTab === "add" && (
        <div
          className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-black mb-6">
            Submit New Achievement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievement Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                required
              >
                <option value="">Select achievement type</option>
                {achievementTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.defaultPoints} points)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievement Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                placeholder="Enter the name of your achievement"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate/Proof *
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
                Upload certificate or proof document (PDF, Image, or Document)
              </p>
            </div>

            {formData.type && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-xl">✅</span>
                  <div>
                    <p className="text-green-800 font-semibold">
                      You will receive{" "}
                      {
                        achievementTypes.find((t) => t.value === formData.type)
                          ?.defaultPoints
                      }{" "}
                      points and{" "}
                      {Math.floor(
                        (achievementTypes.find((t) => t.value === formData.type)
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

            <button
              type="submit"
              disabled={
                !formData.type || !formData.name || !formData.certificate
              }
              className="w-full group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center">
                Submit Achievement
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  🚀
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      )}

      {/* View Achievements */}
      {activeTab === "view" && (
        <div
          className={`space-y-4 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {achievements.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="text-6xl opacity-20 mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Achievements Yet
              </h3>
              <p className="text-gray-600">
                Start by adding your first achievement!
              </p>
            </div>
          ) : (
            achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {achievement.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          achievement.status
                        )}`}
                      >
                        {achievement.status.charAt(0).toUpperCase() +
                          achievement.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {getTypeLabel(achievement.type)}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Submitted:{" "}
                        {new Date(
                          achievement.submittedDate
                        ).toLocaleDateString()}
                      </span>
                      {achievement.approvedDate && (
                        <span>
                          Approved:{" "}
                          {new Date(
                            achievement.approvedDate
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-green-600">
                          +{achievement.points}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">
                          +{achievement.coins}
                        </div>
                        <div className="text-xs text-gray-500">coins</div>
                      </div>
                    </div>
                    {achievement.certificate && (
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
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-black mb-2">
                Achievement Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Your achievement has been submitted for review.
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
                Rewards will be credited once your achievement is approved by
                the admin.
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

export default Achievements;
