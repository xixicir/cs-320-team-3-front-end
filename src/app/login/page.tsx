"use client"

import React from "react";
import { isLoggedIn } from "../auth";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter()
  if (isLoggedIn()) {
    router.push("/")
    return <></>
  }

  // if the auth token is valid, redirect to the home page
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="border p-2 rounded w-full"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="border p-2 rounded w-full"
              placeholder="Password"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <LoginPage />;
}
