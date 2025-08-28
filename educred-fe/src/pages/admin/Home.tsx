"use client";

import { useState, useEffect } from "react";

export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mock dashboard data
  const dashboardStats = {
    todayPoints: 250,
    weeklyGoal: 1000,
    weeklyProgress: 750,
    activeStreak: 7,
    upcomingDeadlines: 3,
    newAchievements: 2,
  };

  const recentActivities = [
    {
      id: 1,
      type: "course",
      title: "Completed React Advanced Patterns",
      points: 150,
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "quiz",
      title: "Passed TypeScript Quiz",
      points: 100,
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "achievement",
      title: "Unlocked Speed Learner Badge",
      points: 200,
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Stats */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Today's Points
              </p>
              <p className="text-3xl font-bold text-black">
                {dashboardStats.todayPoints}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center text-2xl">
              ⭐
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Learning Streak
              </p>
              <p className="text-3xl font-bold text-black">
                {dashboardStats.activeStreak} days
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-2xl">
              🔥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                New Achievements
              </p>
              <p className="text-3xl font-bold text-black">
                {dashboardStats.newAchievements}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
              🏆
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 transform transition-all duration-1000 delay-200 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-black mb-4">Weekly Progress</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Weekly Goal Progress</span>
            <span className="font-medium">
              {dashboardStats.weeklyProgress}/{dashboardStats.weeklyGoal} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${
                  (dashboardStats.weeklyProgress / dashboardStats.weeklyGoal) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 transform transition-all duration-1000 delay-400 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-black mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl">
                {activity.type === "course" && "📚"}
                {activity.type === "quiz" && "✅"}
                {activity.type === "achievement" && "🏆"}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-black">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+{activity.points}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
