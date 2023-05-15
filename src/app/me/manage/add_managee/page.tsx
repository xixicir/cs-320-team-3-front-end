"use client"

import { API_ENDPOINT } from "@/lib/globals";
import { useRouter } from "next/navigation";
import { getAuthHeader, isLoggedIn } from "../../../auth";
import React from "react";
import { useEffect, useState } from "react";

const AddManageePage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errorText, setErrorText] = useState("");

    useEffect(()=>{
        if (!isLoggedIn()) {
            router.push("/login");
            return;
        }
    }, [])

    const handleAdd = async () =>
    {
        const res = await fetch(API_ENDPOINT + "manager/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", ...getAuthHeader(),
            },
            body: JSON.stringify({
                "list_emails": [email]
            }),
          })
          const responseJson = await res.json();
          if (res.ok) {
            router.push("/me/manage");
          } else {
            setErrorText(responseJson.errors + ` for adding of ` + email);
          }
    }
    
    return (<div>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Managee</h1>
        {errorText && <p className="text-red-500 mb-4">{errorText}</p>}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Managee Email</label>
            <input
              type="text"
              id="email"
              className="border p-2 rounded w-full"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Managee
          </button>
        </div>
      </div>
    </div>
    </div>)
}

export default function Page()
{
    return <AddManageePage/>
}