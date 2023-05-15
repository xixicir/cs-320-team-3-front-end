"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getManagerData, isLoggedIn } from "../../auth";

export default function Page() {
  const router = useRouter();
  const [managerData, setManagerData] = useState<any>(null);
  useEffect(() => {
    async function go() {
      if (!isLoggedIn()) {
        router.push("/login");
        return;
      }
      const managerData = await getManagerData();
      setManagerData(managerData);
    }
    go();
  }, []);

  if (managerData === null) {
    return <div>Loading...</div>;
  }

  return (<div>
    <div className="container mx-auto py-10 px-4">
        <h1 className="text-6xl font-bold mb-8 font-playfair text-center">
          Managed Employees:
        </h1>
        <div className="flex flex-col space-y-4">
          <div>
            <div className="border p-2 rounded w-full space-y-4">
              {managerData.account.list_employees.map((entry: any, index: any) => (
                <div key={index} className="border-b flex justify-between py-2">
                  <div>
                    <button onClick = {(e) => (router.push("/me/manage/" + entry.email_address))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                      {(index + 1) + ". Name: " + (entry.first_name) + " " + (entry.last_name) + ", Email: " + (entry.email_address)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick = {(e) => (router.push("/me/manage/add_managee"))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Add New Managee
        </button>
      </div>
  </div>)
}