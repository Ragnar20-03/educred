"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { title: "Learn", description: "Access quality education", icon: "📚" },
    { title: "Certify", description: "Get verified credentials", icon: "🏆" },
    { title: "Connect", description: "Join our community", icon: "👥" },
  ];

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 min-h-[60vh] items-center">
          {/* Main Content Section - 60% on desktop */}
          <div
            className={`lg:col-span-6 space-y-6 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Brand Header */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black animate-pulse">
                  EduCred
                </h1>
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-black to-transparent animate-pulse"></div>
                <div className="absolute -bottom-4 left-0 w-16 h-0.5 bg-gradient-to-r from-gray-600 to-transparent animate-pulse delay-300"></div>
              </div>

              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl font-light">
                Transform your learning journey with verified credentials and
                cutting-edge educational technology.
                <span className="font-semibold text-black">
                  {" "}
                  Join thousands of learners
                </span>{" "}
                building their future today.
              </p>
            </div>

            {/* Custom Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform">
                <span className="relative z-10 flex items-center justify-center">
                  Get Started
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-6 py-3 border-2 border-black text-black font-semibold rounded-lg transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg transform bg-transparent">
                <span className="flex items-center justify-center">
                  Learn More
                  <span className="ml-2 transition-transform group-hover:rotate-45">
                    ↗
                  </span>
                </span>
              </button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200">
              {[
                { number: "10K+", label: "Students", delay: "delay-100" },
                { number: "500+", label: "Courses", delay: "delay-300" },
                { number: "95%", label: "Success Rate", delay: "delay-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-700 ${
                    stat.delay
                  } ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  } hover:scale-110 cursor-pointer`}
                >
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel - 40% on desktop */}
          <div
            className={`lg:col-span-4 space-y-4 transform transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Feature Cards */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-black mb-6 relative">
                Why Choose EduCred?
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-black"></div>
              </h3>

              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-black hover:shadow-xl hover:scale-105 transform ${
                    activeCard === index
                      ? "border-black shadow-xl scale-105"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl p-3 bg-gray-100 rounded-lg group-hover:bg-black group-hover:scale-110 transition-all duration-300">
                      <span className="group-hover:grayscale group-hover:invert transition-all duration-300">
                        {feature.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-black group-hover:text-black transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-black font-bold">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Auth Section */}
            <div className="relative p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-xl hover:border-solid hover:border-black transition-all duration-300 group">
              <div className="text-center space-y-4">
                <h4 className="font-bold text-xl text-black group-hover:scale-105 transition-transform">
                  Ready to Start?
                </h4>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="w-full py-2 px-4 bg-transparent border-2 border-gray-300 text-black font-semibold rounded-lg transition-all duration-300 hover:border-black hover:bg-gray-50 hover:scale-105 transform"
                  >
                    Login
                  </button>
                </div>

                <p className="text-xs text-gray-500 font-medium">
                  Join our community of{" "}
                  <span className="font-bold text-black">10,000+</span> learners
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-gray-400 rounded-full opacity-20 group-hover:opacity-100 transition-opacity delay-100"></div>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full opacity-10 animate-bounce delay-1000"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-600 rounded-full opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-black rounded-full opacity-5 animate-ping delay-3000"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
