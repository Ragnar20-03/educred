"use client";

import { useState, useEffect } from "react";

interface NavProps {
  isAdmin?: boolean;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const Nav = ({
  isAdmin = false,
  onNavigate,
  currentPage = "home",
}: NavProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className={`flex items-center space-x-2 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
              EduCred
            </div>
            <div className="h-6 w-0.5 bg-gradient-to-b from-black to-transparent"></div>
            {isAdmin && (
              <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                Admin
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div
              className={`flex items-center space-x-6 transform transition-all duration-1000 delay-200 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <button
                onClick={() => handleNavClick("home")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 transform ${
                  currentPage === "home"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </button>

              <button
                onClick={() => handleNavClick("market")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 transform ${
                  currentPage === "market"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="text-lg">🛒</span>
                <span>Market</span>
              </button>
            </div>

            {/* Auth Buttons for non-admin */}
            {!isAdmin && (
              <div
                className={`flex items-center space-x-4 transform transition-all duration-1000 delay-400 ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <button className="px-4 py-2 text-gray-700 font-medium hover:text-black transition-colors">
                  Login
                </button>
                <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform">
                  Sign Up
                </button>
              </div>
            )}

            {/* Admin User Info */}
            {isAdmin && (
              <div
                className={`flex items-center space-x-3 transform transition-all duration-1000 delay-400 ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="text-right">
                  <div className="text-sm font-semibold text-black">
                    Alex Johnson
                  </div>
                  <div className="text-xs text-gray-600">2,847 EduCred</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                  AJ
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <button
              onClick={() => handleNavClick("home")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentPage === "home"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick("market")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentPage === "market"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">🛒</span>
              <span>Market</span>
            </button>

            {!isAdmin && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button className="w-full px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Login
                </button>
                <button className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </div>
            )}

            {isAdmin && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                    AJ
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-black">
                      Alex Johnson
                    </div>
                    <div className="text-xs text-gray-600">2,847 EduCred</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
