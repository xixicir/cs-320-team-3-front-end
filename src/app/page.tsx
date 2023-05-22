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
              onClick={() => {deleteAuthToken(); router.push("/login")}}
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
  if (!isLoggedIn()) {
    router.push("/login")
  } else {
    router.push("/me")
  }
}
