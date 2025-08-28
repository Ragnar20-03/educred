"use client";

import { useState, useEffect } from "react";

export const Rankings = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const rankings = [
    {
      rank: 1,
      name: "Sarah Chen",
      points: 15420,
      coins: 3847,
      league: "Diamond",
    },
    {
      rank: 2,
      name: "Alex Johnson",
      points: 14850,
      coins: 3205,
      league: "Platinum",
    },
    {
      rank: 3,
      name: "Maria Rodriguez",
      points: 13920,
      coins: 2980,
      league: "Platinum",
    },
    { rank: 4, name: "David Kim", points: 12750, coins: 2654, league: "Gold" },
    {
      rank: 5,
      name: "Emma Wilson",
      points: 11890,
      coins: 2398,
      league: "Gold",
    },
  ];

  return (
    <div className="space-y-6">
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Global Rankings</h2>
          <p className="text-gray-600">
            Top students ranked by reputation points
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  League
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Coins
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rankings.map((student) => (
                <tr key={student.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {student.rank === 1 && "🥇"}
                        {student.rank === 2 && "🥈"}
                        {student.rank === 3 && "🥉"}
                        {student.rank > 3 && `#${student.rank}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-black">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {student.league}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-black">
                      {student.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-700">
                      {student.coins.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
