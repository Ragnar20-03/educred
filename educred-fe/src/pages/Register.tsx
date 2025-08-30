import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

// Wallet adapter UI base styles
import "@solana/wallet-adapter-react-ui/styles.css";
import { GET_OTP, VERIFY_OTP } from "../URL";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  institueEmail: string;
  password: string;
  confirmPassword: string;
  email: string;
  fname: string;
  lname: string;
  ph: string;
}

// Wallet context provider (Devnet by default)
const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Rely on Wallet Standard detection. If you need legacy adapters, add them here.
  const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const RegisterContent = () => {
  const navigate = useNavigate();
  const [otpWarning, setOtpWarning] = useState(false);
  const { publicKey, connecting, connected, disconnect, wallet, wallets } =
    useWallet();
  const { setVisible } = useWalletModal();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    institueEmail: "",
    password: "",
    confirmPassword: "",
    email: "",
    fname: "",
    lname: "",
    ph: "",
  });
  const [errors, setErrors] = useState<
    Partial<RegisterFormData & { wallet: string; otp: string }>
  >({});

  // OTP related states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Detect installed wallets via adapter readyState and Phantom availability
  const [phantomDetected, setPhantomDetected] = useState<boolean | null>(null);
  useEffect(() => {
    setIsLoaded(true);
    const isPhantom =
      typeof window !== "undefined" &&
      (window as any).phantom?.solana?.isPhantom;
    setPhantomDetected(!!isPhantom);
  }, []);

  // First-time warning after selecting a wallet
  const warnedRef = useRef(false);
  useEffect(() => {
    if (connected && !warnedRef.current) {
      warnedRef.current = true;
    }
  }, [connected]);

  // Determine if any installed/loadable wallet is available

  const hasInstalledOrLoadableWallet = (wallets as any[]).some(
    (w: any) => w.readyState === "Installed" || w.readyState === "Loadable"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
    setOtp(value);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData & { wallet: string }> = {};

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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.ph.trim() && !/^\+?[\d\s-]{10,}$/.test(formData.ph)) {
      newErrors.ph = "Please enter a valid phone number";
    }

    if (!connected) newErrors.wallet = "Please connect your wallet";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = (): boolean => {
    const otpRegex = /^[a-zA-Z0-9]{6}$/; // 6 alphanumeric characters
    if (!otpRegex.test(otp)) {
      setErrors((prev) => ({
        ...prev,
        otp: "OTP must be 6 alphanumeric characters",
      }));
      return false;
    }
    // Clear previous OTP error if valid
    setErrors((prev) => ({ ...prev, otp: undefined }));
    return true;
  };
  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSendingOtp(true);
    try {
      axios
        .post(`${GET_OTP}`, formData, { withCredentials: true })
        .then((res) => {
          console.log("response from get ot is : ", res);
          alert(
            `OTP sent to ${formData.institueEmail}! Please check your email.`
          );
          setOtpSent(true);
          setShowOtpModal(true);
        })
        .catch((err) => {
          console.log("error from get ot is : ", err);
        });
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyAndCreateAccount = async () => {
    const ok = await validateOtp();
    if (!ok) return;

    setIsVerifying(true);
    try {
      const registrationData = {
        ...formData,
        wallet: {
          walletAddress: wallet?.adapter.publicKey,
          walletName: wallet?.adapter.name, // or dynamically selected name
        },
        otp: otp, // include the entered OTP
      };
      axios
        .post(VERIFY_OTP, registrationData, { withCredentials: true })
        .then((res) => {
          console.log("res from verify OTP is : ", res);
          alert("Account created Succesfully !");
          navigate("/login");
        })

        .catch((err) => {
          console.log("error from verify OTP is : ", err);
          setOtpWarning(true);
        });
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp("");
    setErrors((prev) => ({ ...prev, otp: undefined }));
  };

  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                Join EduCred
              </h1>
              <div className="h-1 bg-gradient-to-r from-black via-gray-600 to-black mt-2 animate-pulse mx-auto w-24"></div>
              <p className="mt-4 text-gray-700 font-light">
                Create your account and start earning educational NFTs
              </p>
            </div>

            {/* Wallet Connection */}
            <div className="mb-6">
              {!connected ? (
                <div className="w-full space-y-2">
                  {/* Custom "Select Wallet" button styled like the Get OTP button */}
                  <button
                    type="button"
                    onClick={() => setVisible(true)}
                    disabled={connecting}
                    className="w-full group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {connecting ? "Connecting..." : "Select Wallet"}
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        👛
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* If no wallets detected, show install Phantom link */}
                  {phantomDetected === false &&
                    !hasInstalledOrLoadableWallet && (
                      <p className="text-sm text-gray-600">
                        Don{"'"}t have a wallet?{" "}
                        <a
                          href="https://phantom.app/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black font-semibold hover:underline"
                        >
                          Install Phantom
                        </a>{" "}
                        to add it to your browser.
                      </p>
                    )}
                </div>
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Connected Wallet
                      </p>
                      <p className="text-black font-bold font-mono text-sm break-all sm:break-normal">
                        {publicKey?.toString().slice(0, 8)}...
                        {publicKey?.toString().slice(-8)}
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        Note: Keep your wallet safe ! it can not be change later
                        ..
                      </p>
                    </div>
                    {/* Keeping a disconnect button for dev/testing; remove if you want to enforce no-change */}
                    <button
                      onClick={() => disconnect()}
                      className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors self-start sm:self-auto"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
              {errors.wallet && (
                <p className="mt-1 text-sm text-red-600">{errors.wallet}</p>
              )}
            </div>

            {/* Registration Form */}
            <form onSubmit={handleGetOtp} className="space-y-6">
              {/* Institute Email */}
              <div>
                <label
                  htmlFor="institueEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Institute Email *
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

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.fname
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="John"
                  />
                  {errors.fname && (
                    <p className="mt-1 text-sm text-red-600">{errors.fname}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lname"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.lname
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lname && (
                    <p className="mt-1 text-sm text-red-600">{errors.lname}</p>
                  )}
                </div>
              </div>

              {/* Personal Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Personal Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="john.doe@gmail.com (optional)"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="ph"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="ph"
                  name="ph"
                  value={formData.ph}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.ph
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="+1 (555) 123-4567 (optional)"
                />
                {errors.ph && (
                  <p className="mt-1 text-sm text-red-600">{errors.ph}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password *
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
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Get OTP button */}
              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full group relative px-6 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSendingOtp ? "Sending OTP..." : "Get OTP"}
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
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-black font-semibold hover:underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 text-sm">
                {"We've"} sent a 6-digit verification code to
                <br />
                <span className="font-semibold text-black">
                  {formData.institueEmail}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className={`w-full px-4 py-3 border rounded-lg font-mono text-lg text-center tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                    otpWarning
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="ABC123"
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter the 6-digit alphanumeric code
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={closeOtpModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyAndCreateAccount}
                  disabled={isVerifying || otp.length !== 6}
                  className="flex-1 group relative px-4 py-3 bg-black text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isVerifying ? "Verifying..." : "Verify & Create Account"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={handleGetOtp}
                  disabled={isSendingOtp}
                  className="text-sm text-gray-600 hover:text-black transition-colors disabled:opacity-50"
                >
                  {isSendingOtp ? "Sending..." : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main export that wraps the component with wallet providers
export const Register = () => {
  return (
    <WalletContextProvider>
      <RegisterContent />
    </WalletContextProvider>
  );
};

export default Register;
