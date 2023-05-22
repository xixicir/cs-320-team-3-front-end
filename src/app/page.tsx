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
              className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 font-bold text-lg"
            >
              TimePunch
            </div>
            <div className="flex space-x-4">
              <div
                onClick={() => router.push("/me")}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
              >
                Dashboard
              </div>
              <div
                onClick={() => router.push("/me/add")}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
              >
                Hours
              </div>
              <div
                onClick={() => router.push("/me/manage")}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
              >
                Manage
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div
              onClick={() => {router.push("/logout")}}
              className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-150 py-1 px-4 rounded hidden sm:block"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
    
};

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <h1 className="text-center text-4xl font-bold mb-8 text-indigo-700 tracking-tight">
            Welcome to TimePunch!
      </h1>
      <div className="flex flex-col space-y-4">
        {(!isLoggedIn()) ? <button
          onClick={() => {router.push("/login")}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Proceed to Login
        </button> : <button
        onClick={() => {router.push("/me")}}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Proceed to Your Home Page!
          </button>}
          {
            (!isLoggedIn()) ? <button
            onClick={() => {router.push("/signup")}}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Proceed to Sign Up
            </button> : <div></div>
          }
      </div>
    </div>
  </div>
);
}
