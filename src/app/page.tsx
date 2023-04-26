"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, deleteAuthToken } from "./auth";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Time Tracker</h1>
        <p className="text-xl">Welcome to the Time Tracker application!</p>
        {!isLoggedIn() ? <button onClick={()=>{router.push("/login")}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded w-full">
          Proceed to Login Page
          </button> : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded w-full">
          Proceed to your home page!
          </button> 
        }
        {!isLoggedIn() ? <button onClick={()=>{router.push("/signup")}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded w-full">
          Proceed to Sign Up Page
          </button> : null
        }
      </div>
    </div>
  );
};

export default function Page() {
  return <HomePage />;
}
