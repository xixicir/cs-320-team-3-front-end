"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, deleteAuthToken } from "./auth";

export const Taskbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div
              onClick={() => router.push("/")}
              className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 font-bold text-lg"
            >
              Time Tracker
            </div>
            <div className="flex space-x-4">
              <div
                onClick={() => router.push("/")}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
              >
                Home
              </div>
              <div
                onClick={() => router.push("/me")}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
              >
                Dashboard
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <Taskbar />
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-5xl font-bold text-black-700 mb-4">Time Tracker</h1>
          <p className="text-xl text-gray-700">Welcome to the Time Tracker application!</p>
          {!isLoggedIn() ? (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 mb-2 w-full"
            >
              Proceed to Login Page
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/me");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 mb-2 w-full"
            >
              Proceed to your home page!
            </button>
          )}

          {!isLoggedIn() ? (
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Proceed to Sign Up Page
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return <HomePage />;
}
