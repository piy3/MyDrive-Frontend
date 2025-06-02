"use client";
import { login, registerUser } from "@/api/request";
import ModeToggle from "@/components/ui/ModeToggle";
import { useGlobalStore } from "@/store/useGlobalStore";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

const Home = () => {
  // State to manage the active form (login or signup)
  const [activeForm, setActiveForm] = useState("login");
  // State to manage the dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for custom alert message
  const [alertMessage, setAlertMessage] = useState("");
  // State to control visibility of the custom alert modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const setUserInfo = useGlobalStore(
    (store)=>store.setUserInfo
  )
  const router = useRouter();

  // Effect to apply dark mode class to the HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]); // Re-run when darkMode state changes

  // Function to show a specific form
  const showForm = (formName) => {
    setActiveForm(formName);
  };

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;
    const rememberMe = e.target.rememberMe.checked; 
    setLoading(true);
    try {
      const response = await login({ email, password });
      console.log(response);
      if (response?.data?.success) {
        toast.success("Login Successfull");
        console.log("res_user: ",response.data.user)
        setUserInfo(response.data?.user);
        router.push(`/mydrive`);
      }
    } catch (err) {
     
      toast.error(err.response?.data?.message);
      console.log(err);
    }
    setLoading(false);
  };

  // Function to handle signup form submission
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const fullname = event.target.signupName.value;
    const email = event.target.signupEmail.value;
    const password = event.target.signupPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      showCustomAlert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        fullname,
        email,
        password,
      });
      toast.success("Signup Successful! Please login.");
      setActiveForm("login"); // Switch to login form after successful signup
      
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }

    setLoading(false);
  };

  // Function to show the custom alert modal
  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlertModal(true);
  };

  // Function to close the custom alert modal
  const closeCustomAlert = () => {
    setShowAlertModal(false);
    setAlertMessage("");
  };



  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {/* <ParticlesBackground preset="default" className="fixed inset-0 -z-10" /> */}
        <ModeToggle />
      </div>
      <div className="  flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden transition-colors duration-300">
          {/* Left Section: Image/Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-8 relative">
            {/* Abstract shapes for visual interest */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

            <div className="text-center text-white z-10">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Secure Your <br />
                Digital Life
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Store, share, and access your files from anywhere, anytime.
              </p>
              {/* Placeholder for a file storage illustration/GIF */}
              <img
                src="https://placehold.co/300x200/6366F1/FFFFFF?text=File+Storage+Illustration"
                alt="File Storage Illustration"
                className="mx-auto rounded-lg shadow-xl mt-8 max-w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/300x200/6366F1/FFFFFF?text=Illustration";
                }}
              />
              <p className="text-sm mt-4 opacity-70">
                Your data, your rules. Encrypted and safe.
              </p>
            </div>
          </div>

          {/* Right Section: Login/Signup Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-800 transition-colors duration-300">
            {/* Logo/App Name */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                MyDrive
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your files, anywhere.
              </p>
            </div>

            {/* Tabs for Login/Signup */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                onClick={() => showForm("login")}
                className={`flex-1 py-3 text-center text-lg text-gray-700 dark:text-gray-300 border-b-2 transition-colors duration-200 tab-button ${
                  activeForm === "login"
                    ? "border-blue-500 text-blue-500 font-semibold"
                    : "border-transparent hover:border-blue-400 dark:hover:border-blue-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => showForm("signup")}
                className={`flex-1 py-3 text-center text-lg text-gray-700 dark:text-gray-300 border-b-2 transition-colors duration-200 tab-button ${
                  activeForm === "signup"
                    ? "border-blue-500 text-blue-500 font-semibold"
                    : "border-transparent hover:border-blue-400 dark:hover:border-blue-300"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeForm === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="loginEmail"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loginPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Forgot your password?
                  </a>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {loading ? (
                    <PropagateLoader className="mb-[4%]" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeForm === "signup" && (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="signupName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="signupName"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="signupEmail"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="signupPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirm_password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </form>
            )}

            {/* Social Login Option */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 font-semibold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.084 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09L37.75 10.375C34.23 7.642 29.67 6 24 6c-9.389 0-17 7.611-17 17s7.611 17 17 17c9.389 0 16.68-6.574 17.431-16.319z"
                  fill="#FFC107"
                />
                <path
                  d="M6 23c0-1.881.745-3.653 2.056-4.964l-2.056-2.056C3.712 18.064 3 20.444 3 23s.712 4.936 2.056 6.964l2.056-2.056C6.745 26.653 6 24.881 6 23z"
                  fill="#FF3D00"
                />
                <path
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-2.913-2.913C32.152 38.636 28.327 40 24 40c-5.592 0-10.493-3.31-12.766-8.062l-2.913 2.913C11.503 41.341 17.211 44 24 44z"
                  fill="#4CAF50"
                />
                <path
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.084 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09L37.75 10.375C34.23 7.642 29.67 6 24 6c-9.389 0-17 7.611-17 17s7.611 17 17 17c9.389 0 16.68-6.574 17.431-16.319z"
                  fill="#1976D2"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Custom Alert Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl max-w-sm w-full text-center transition-colors duration-300">
              <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {alertMessage}
              </p>
              <button
                onClick={closeCustomAlert}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
