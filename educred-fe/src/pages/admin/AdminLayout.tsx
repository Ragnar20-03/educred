"use client";

import { useState, useEffect, useRef } from "react";
import Achievements from "./Achivement";
import Rankings from "./Rankings";
import MarketPlace from "../MarketPlace";
import Education from "./Education";
import History from "./History";
import Profile from "./Profile";
import Home from "../Home";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  hasSubmenu?: boolean;
  submenu?: { id: string; label: string; icon: string }[];
}

interface StudentData {
  name: string;
  email: string;
  avatar: string;
  reputationPoints: number;
  eduCredCoins: number;
  league: string;
  walletAddress: string;
}

export const AdminLayout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please login !");
      navigate("/"); // will run only AFTER alert is dismissed
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }
  // Mock student data
  const studentData: StudentData = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    avatar: "AJ",
    reputationPoints: 15420,
    eduCredCoins: 2847,
    league: "Gold",
    walletAddress: "7xKXtg2CW...9Y5KvANd",
  };

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "Home",
      icon: "🏠",
      description: "Dashboard overview",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      description: "Manage your profile",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: "🏆",
      description: "View and add achievements",
      hasSubmenu: true,
    },
    {
      id: "education",
      label: "Education",
      icon: "🎓",
      description: "Course progress and learning",
    },
    {
      id: "history",
      label: "History",
      icon: "📜",
      description: "Activity and transaction history",
    },
    {
      id: "market",
      label: "Market",
      icon: "🛒",
      description: "Buy and sell NFTs",
    },
    {
      id: "rankings",
      label: "Rankings",
      icon: "📊",
      description: "Student leaderboards",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("Logging out...");
      dispatch(logout());
      alert("Logged out successfully!");
      navigate("/");
    }
  };

  const getActiveItemData = () => {
    return (
      navigationItems.find((item) => item.id === activeItem) ||
      navigationItems[0]
    );
  };

  const renderMainContent = () => {
    const activeItemData = getActiveItemData();

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{activeItemData.icon}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                {activeItemData.label}
              </h1>
              <p className="text-gray-600">{activeItemData.description}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        <div>
          {activeItem === "profile" && <Profile />}
          {activeItem === "education" && <Education />}
          {activeItem === "history" && <History />}
          {activeItem === "market" && <MarketPlace />}
          {activeItem === "rankings" && <Rankings />}
          {activeItem === "achievements" && <Achievements />}
        </div>
      </div>
    );
  };

  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-20" : "w-80"
          } min-h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div
                  className={`transform transition-all duration-500 ${
                    isLoaded
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                >
                  <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                    EduCred Admin
                  </h1>
                  <div className="h-0.5 bg-gradient-to-r from-black to-transparent mt-1"></div>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{sidebarCollapsed ? "→" : "←"}</span>
              </button>
            </div>

            {/* User Info */}
            {!sidebarCollapsed && (
              <div
                className={`mt-4 p-4 bg-gray-50 rounded-lg transform transition-all duration-700 delay-200 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                    {studentData.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-black truncate">
                      {studentData.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {studentData.email}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-bold text-black">
                      {studentData.reputationPoints.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Points</div>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-bold text-black">
                      {studentData.eduCredCoins.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Coins</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                className={`transform transition-all duration-500 delay-${
                  index * 100
                }`}
                style={{
                  transform: isLoaded ? "translateX(0)" : "translateX(-20px)",
                  opacity: isLoaded ? 1 : 0,
                }}
              >
                <button
                  onClick={() => setActiveItem(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 transform ${
                    activeItem === item.id
                      ? "bg-black text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{item.label}</div>
                      {hoveredItem === item.id && (
                        <div className="text-xs opacity-75 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                  {!sidebarCollapsed && item.hasSubmenu && (
                    <span className="text-sm opacity-60">▼</span>
                  )}
                </button>

                {/* Submenu for Achievements */}
                {!sidebarCollapsed &&
                  item.hasSubmenu &&
                  activeItem === item.id && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveItem(subItem.id)}
                          className="w-full flex items-center space-x-2 p-2 rounded-lg text-sm hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                        >
                          <span>{subItem.icon}</span>
                          <span>{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="relative m-3">
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center space-x-2 p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-300 hover:scale-105 transform border border-red-200 ${
                sidebarCollapsed ? "px-2" : ""
              }`}
            >
              <span className="text-lg">🚪</span>
              {!sidebarCollapsed && (
                <span className="font-semibold">Logout</span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Top Bar */}
          <div
            className={`mb-6 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">👋</div>
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      Welcome back, {studentData.name}!
                    </h2>
                    <p className="text-sm text-gray-600">
                      {studentData.league} League • Wallet:{" "}
                      {studentData.walletAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Current Balance</div>
                    <div className="font-bold text-black">
                      {studentData.eduCredCoins} EduCred
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                    {studentData.avatar}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
