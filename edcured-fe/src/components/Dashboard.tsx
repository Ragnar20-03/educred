"use client";

import { useState, useEffect } from "react";

interface Student {
  id: number;
  name: string;
  reputationPoints: number;
  eduCredCoins: number;
  avatar: string;
  league: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  coursesCompleted: number;
  joinDate: string;
}

export const Records = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateRanks, setAnimateRanks] = useState(false);
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);

  // Mock student data - sorted by reputation points (highest first)
  const studentsData: Student[] = [
    {
      id: 1,
      name: "Sarah Chen",
      reputationPoints: 15420,
      eduCredCoins: 3847,
      avatar: "SC",
      league: "Diamond",
      coursesCompleted: 28,
      joinDate: "2023-09-15",
    },
    {
      id: 2,
      name: "Alex Johnson",
      reputationPoints: 14850,
      eduCredCoins: 3205,
      avatar: "AJ",
      league: "Platinum",
      coursesCompleted: 25,
      joinDate: "2023-10-02",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      reputationPoints: 13920,
      eduCredCoins: 2980,
      avatar: "MR",
      league: "Platinum",
      coursesCompleted: 23,
      joinDate: "2023-08-20",
    },
    {
      id: 4,
      name: "David Kim",
      reputationPoints: 12750,
      eduCredCoins: 2654,
      avatar: "DK",
      league: "Gold",
      coursesCompleted: 21,
      joinDate: "2023-11-10",
    },
    {
      id: 5,
      name: "Emma Wilson",
      reputationPoints: 11890,
      eduCredCoins: 2398,
      avatar: "EW",
      league: "Gold",
      coursesCompleted: 19,
      joinDate: "2023-09-28",
    },
    {
      id: 6,
      name: "James Brown",
      reputationPoints: 10950,
      eduCredCoins: 2156,
      avatar: "JB",
      league: "Gold",
      coursesCompleted: 18,
      joinDate: "2023-12-05",
    },
    {
      id: 7,
      name: "Lisa Zhang",
      reputationPoints: 9840,
      eduCredCoins: 1923,
      avatar: "LZ",
      league: "Silver",
      coursesCompleted: 16,
      joinDate: "2023-10-18",
    },
    {
      id: 8,
      name: "Michael Davis",
      reputationPoints: 8750,
      eduCredCoins: 1687,
      avatar: "MD",
      league: "Silver",
      coursesCompleted: 14,
      joinDate: "2023-11-22",
    },
    {
      id: 9,
      name: "Anna Taylor",
      reputationPoints: 7650,
      eduCredCoins: 1445,
      avatar: "AT",
      league: "Silver",
      coursesCompleted: 12,
      joinDate: "2023-12-15",
    },
    {
      id: 10,
      name: "Ryan Miller",
      reputationPoints: 6580,
      eduCredCoins: 1234,
      avatar: "RM",
      league: "Bronze",
      coursesCompleted: 10,
      joinDate: "2024-01-08",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const rankTimer = setTimeout(() => setAnimateRanks(true), 800);
    return () => clearTimeout(rankTimer);
  }, []);

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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-black to-gray-800 text-white shadow-lg scale-110";
      case 2:
        return "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg scale-105";
      case 3:
        return "bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg scale-105";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-black";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-600";
      case 3:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500";
      default:
        return "bg-white hover:bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header Section */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
            <div className="text-center space-y-3">
              <div className="inline-block">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                  🏆 EduCred Leaderboard
                </h1>
                <div className="h-1 bg-gradient-to-r from-black via-gray-600 to-black mt-2 animate-pulse"></div>
              </div>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Top performers ranked by reputation points. Compete with fellow
                learners and climb the ranks!
              </p>
            </div>

            {/* Top 3 Podium */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {studentsData.slice(0, 3).map((student, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={student.id}
                    className={`transform transition-all duration-700 delay-${
                      index * 200
                    } ${
                      animateRanks
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-10 opacity-0 scale-95"
                    } ${
                      rank === 1
                        ? "md:order-2"
                        : rank === 2
                        ? "md:order-1"
                        : "md:order-3"
                    }`}
                  >
                    <div
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                        rank === 1
                          ? "border-black bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl"
                          : rank === 2
                          ? "border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg"
                          : "border-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg"
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(
                            rank
                          )}`}
                        >
                          {getRankIcon(rank)}
                        </div>
                      </div>

                      <div className="text-center mt-3 space-y-2">
                        <div
                          className={`w-12 h-12 mx-auto bg-gradient-to-r ${getLeagueColor(
                            student.league
                          )} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {student.avatar}
                        </div>
                        <h3 className="font-bold text-base text-black">
                          {student.name}
                        </h3>
                        <div
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLeagueColor(
                            student.league
                          )} text-white`}
                        >
                          {student.league}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-lg">⭐</span>
                            <span className="font-bold text-lg text-black">
                              {student.reputationPoints.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-base">🪙</span>
                            <span className="font-semibold text-sm text-gray-700">
                              {student.eduCredCoins.toLocaleString()} EduCred
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div
          className={`transform transition-all duration-1000 delay-400 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">
                Complete Rankings
              </h2>
              <p className="text-sm text-gray-600">
                All students ranked by reputation points
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      League
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reputation Points
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EduCred Coins
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Courses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentsData.map((student, index) => {
                    const rank = index + 1;
                    return (
                      <tr
                        key={student.id}
                        className={`transition-all duration-300 hover:scale-[1.01] cursor-pointer ${getRowStyle(
                          rank
                        )} ${hoveredRank === rank ? "shadow-lg" : ""}`}
                        onMouseEnter={() => setHoveredRank(rank)}
                        onMouseLeave={() => setHoveredRank(null)}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${getRankStyle(
                              rank
                            )} transition-all duration-300`}
                          >
                            {getRankIcon(rank)}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${getLeagueColor(
                                student.league
                              )} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                            >
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-base text-black">
                                {student.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Joined{" "}
                                {new Date(
                                  student.joinDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLeagueColor(
                              student.league
                            )} text-white shadow-md`}
                          >
                            {student.league}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">⭐</span>
                            <span className="font-bold text-lg text-black">
                              {student.reputationPoints.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">🪙</span>
                            <span className="font-semibold text-base text-gray-700">
                              {student.eduCredCoins.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              EduCred
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">📚</span>
                            <span className="font-semibold text-gray-700">
                              {student.coursesCompleted}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div
          className={`transform transition-all duration-1000 delay-600 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                title: "Total Students",
                value: studentsData.length.toString(),
                icon: "👥",
                color: "from-gray-600 to-gray-800",
              },
              {
                title: "Average Points",
                value: Math.round(
                  studentsData.reduce(
                    (sum, student) => sum + student.reputationPoints,
                    0
                  ) / studentsData.length
                ).toLocaleString(),
                icon: "⭐",
                color: "from-black to-gray-700",
              },
              {
                title: "Total EduCred",
                value: studentsData
                  .reduce((sum, student) => sum + student.eduCredCoins, 0)
                  .toLocaleString(),
                icon: "🪙",
                color: "from-gray-700 to-gray-900",
              },
              {
                title: "Courses Completed",
                value: studentsData
                  .reduce((sum, student) => sum + student.coursesCompleted, 0)
                  .toString(),
                icon: "📚",
                color: "from-gray-500 to-gray-700",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs font-medium">
                      {stat.title}
                    </p>
                    <p className="text-lg font-bold text-black mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-lg shadow-lg`}
                  >
                    <span className="filter invert">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
