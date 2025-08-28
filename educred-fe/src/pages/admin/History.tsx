"use client";

import { useState, useEffect } from "react";

export const History = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const historyData = [
    {
      id: 1,
      type: "course",
      action: "Completed Advanced React Patterns",
      points: 150,
      coins: 50,
      date: "2024-01-16",
    },
    {
      id: 2,
      type: "quiz",
      action: "Passed TypeScript Quiz",
      points: 100,
      coins: 25,
      date: "2024-01-15",
    },
    {
      id: 3,
      type: "purchase",
      action: "Bought NFT: The Overachiever",
      points: 0,
      coins: -500,
      date: "2024-01-14",
    },
    {
      id: 4,
      type: "achievement",
      action: "Unlocked Speed Learner Badge",
      points: 200,
      coins: 75,
      date: "2024-01-13",
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
          <h2 className="text-xl font-bold text-black">Activity History</h2>
          <p className="text-gray-600">
            Your complete learning and transaction history
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Activity
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
              {historyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">
                        {item.type === "course" && "📚"}
                        {item.type === "quiz" && "✅"}
                        {item.type === "purchase" && "🛒"}
                        {item.type === "achievement" && "🏆"}
                      </span>
                      <span className="text-black font-medium">
                        {item.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        item.points > 0 ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {item.points > 0 ? `+${item.points}` : item.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        item.coins > 0
                          ? "text-green-600"
                          : item.coins < 0
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.coins > 0 ? `+${item.coins}` : item.coins}
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

export default History;
