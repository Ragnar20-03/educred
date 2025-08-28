"use client";

import { useState, useEffect } from "react";

interface ProfileData {
  institueEmail: string;
  email?: string;
  fname: string;
  lname: string;
  ph?: string;
  wallet: {
    walletAddress: string;
    walletName: string;
  };
  reputationPoints: number;
  eduCredCoins: number;
  rank: number;
  league: string;
  joinDate: string;
  coursesCompleted: number;
  uid: string;
}

export const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<ProfileData>>({});

  // Mock profile data based on your schema
  const profileData: ProfileData = {
    institueEmail: "alex.johnson@university.edu",
    email: "alex.personal@gmail.com",
    fname: "Alex",
    lname: "Johnson",
    ph: "+1 (555) 123-4567",
    wallet: {
      walletAddress: "7xKXtg2CWEuLkjbPfRvNqGpMhAzBvYc9Y5KvANd",
      walletName: "Phantom",
    },
    reputationPoints: 15420,
    eduCredCoins: 2847,
    rank: 3,
    league: "Gold",
    joinDate: "2023-09-15",
    coursesCompleted: 12,
    uid: "507f1f77bcf86cd799439011",
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      email: profileData.email,
      fname: profileData.fname,
      lname: profileData.lname,
      ph: profileData.ph,
    });
  };

  const handleSave = () => {
    // Mock save logic
    console.log("Saving profile data:", editData);
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const getRankSuffix = (rank: number) => {
    if (rank % 10 === 1 && rank % 100 !== 11) return "st";
    if (rank % 10 === 2 && rank % 100 !== 12) return "nd";
    if (rank % 10 === 3 && rank % 100 !== 13) return "rd";
    return "th";
  };

  const getLeagueColor = (league: string) => {
    switch (league) {
      case "Bronze":
        return "from-gray-600 to-gray-800";
      case "Silver":
        return "from-gray-400 to-gray-600";
      case "Gold":
        return "from-gray-800 to-black";
      case "Platinum":
        return "from-gray-700 to-gray-900";
      case "Diamond":
        return "from-black to-gray-800";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {profileData.fname[0]}
                  {profileData.lname[0]}
                </div>
                <div>
                  <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                    {profileData.fname} {profileData.lname}
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-black via-gray-600 to-black mt-1 w-24"></div>
                  <p className="text-gray-600 mt-2">
                    {profileData.institueEmail}
                  </p>
                  <p className="text-sm text-gray-500">
                    Member since{" "}
                    {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div
                  className={`px-6 py-3 bg-gradient-to-r ${getLeagueColor(
                    profileData.league
                  )} text-white rounded-full font-bold text-lg shadow-lg`}
                >
                  {profileData.league} League
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">
                    #{profileData.rank}
                    <span className="text-sm">
                      {getRankSuffix(profileData.rank)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Global Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 delay-200 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Reputation Points
                </p>
                <p className="text-3xl font-bold text-black mt-1">
                  {profileData.reputationPoints.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-700 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                <span className="filter invert">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  EduCred Coins
                </p>
                <p className="text-3xl font-bold text-black mt-1">
                  {profileData.eduCredCoins.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                <span className="filter invert">🪙</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Courses Completed
                </p>
                <p className="text-3xl font-bold text-black mt-1">
                  {profileData.coursesCompleted}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                <span className="filter invert">📚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div
          className={`transform transition-all duration-1000 delay-400 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">
                Profile Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="group relative px-6 py-2 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Edit Profile
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      ✏️
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fname || profileData.fname}
                      onChange={(e) =>
                        handleInputChange("fname", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  ) : (
                    <p className="text-black font-semibold">
                      {profileData.fname}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lname || profileData.lname}
                      onChange={(e) =>
                        handleInputChange("lname", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  ) : (
                    <p className="text-black font-semibold">
                      {profileData.lname}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institute Email
                  </label>
                  <p className="text-black font-semibold">
                    {profileData.institueEmail}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Institute email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email || profileData.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Optional"
                    />
                  ) : (
                    <p className="text-black font-semibold">
                      {profileData.email || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.ph || profileData.ph || ""}
                      onChange={(e) => handleInputChange("ph", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Optional"
                    />
                  ) : (
                    <p className="text-black font-semibold">
                      {profileData.ph || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-2">
                  Account Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <p className="text-black font-mono text-sm bg-gray-100 p-2 rounded">
                    {profileData.uid}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Name
                  </label>
                  <p className="text-black font-semibold flex items-center">
                    <span className="mr-2">👻</span>
                    {profileData.wallet.walletName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <p className="text-black font-mono text-sm bg-gray-100 p-2 rounded flex-1 truncate">
                      {profileData.wallet.walletAddress}
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          profileData.wallet.walletAddress
                        )
                      }
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Wallet address cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current League
                  </label>
                  <div
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${getLeagueColor(
                      profileData.league
                    )} text-white rounded-lg font-bold shadow-lg`}
                  >
                    {profileData.league}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <p className="text-black font-semibold">
                    {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Summary */}
        <div
          className={`transform transition-all duration-1000 delay-600 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {profileData.rank}
                </div>
                <div className="text-sm text-gray-600">Global Rank</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {profileData.reputationPoints.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {profileData.eduCredCoins.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">EduCred Coins</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {profileData.coursesCompleted}
                </div>
                <div className="text-sm text-gray-600">Courses Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
