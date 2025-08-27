"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface LoginFormData {
  institueEmail: string;
  password: string;
}

export const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    institueEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.institueEmail.trim()) {
      newErrors.institueEmail = "Institute email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.institueEmail)) {
      newErrors.institueEmail = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Mock login logic
    console.log("Login attempt:", formData);
    alert(`Login successful! Welcome back.`);
  };

  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                EduCred Login
              </h1>
              <div className="h-1 bg-gradient-to-r from-black via-gray-600 to-black mt-2 animate-pulse mx-auto w-24"></div>
              <p className="mt-4 text-gray-700 font-light">
                Access your educational achievements and NFT collection
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="institueEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Institute Email
                </label>
                <input
                  type="email"
                  id="institueEmail"
                  name="institueEmail"
                  value={formData.institueEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.institueEmail
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="student@university.edu"
                />
                {errors.institueEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.institueEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Sign In
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
