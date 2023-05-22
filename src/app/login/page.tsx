"use client";

import { API_ENDPOINT } from "@/lib/globals";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isLoggedIn, storeAuthToken } from "../auth";

const LoginPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/me");
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch(API_ENDPOINT + "account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: userName,
        password,
      }),
    });

    const responseJson = await response.json();
    if (response.ok) {
      storeAuthToken(responseJson.token);
      router.push("/me");
    } else {
      setErrorText(responseJson.errors + ` for ${userName}, ${password}`);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-700 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-center text-4xl font-bold mb-8 text-indigo-700 tracking-tight">
              Login
        </h1>
        {errorText && <p className="text-red-500 mb-4">{errorText}</p>}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="border p-2 rounded w-full"
              placeholder="Username"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="border p-2 rounded w-full"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
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
