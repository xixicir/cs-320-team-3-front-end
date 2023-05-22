"use client";

import { API_ENDPOINT } from "@/lib/globals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserData, storeAuthToken } from "../auth";

const SignupPage = () => {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [payRate, setPayRate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      email_address: email,
      password,
      first_name: firstName,
      last_name: lastName,
      pay_rate: payRate,
    });

    const response = await fetch(API_ENDPOINT + "account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        password,
        first_name: firstName,
        last_name: lastName,
        pay_rate: payRate,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        setErrorText(data.errors);
        return;
      }
    }

    const { user_created, token } = data;
    storeAuthToken(token);

    if (user_created) {
      const response = await fetch(API_ENDPOINT + "account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          password,
        }),
      });
    
      const responseJson = await response.json();
      if (response.ok) {
        storeAuthToken(responseJson.token);
        router.push("/me");
      } else {
        setErrorText(responseJson.errors + ` for ${email}, ${password}`);
      }
    }
    else {
      throw new Error(`Failed to create user: ${JSON.stringify(data)}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
        {errorText && <p className="text-red-500 mb-4">{errorText}</p>}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              className="border p-2 rounded w-full"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="border p-2 rounded w-full"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2">Email</label>
            <input
              id="username"
              type="email"
              className="border p-2 rounded w-full"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="border p-2 rounded w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="payRate" className="block mb-2">Pay Rate</label>
            <input
              type="number"
              id="payRate"
              className="border p-2 rounded w-full"
              placeholder="Pay Rate"
              value={payRate}
              onChange={(e) => setPayRate(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Page() {
  return <SignupPage />;
}
