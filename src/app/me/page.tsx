"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../auth";
import { Taskbar } from "../page"

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    async function go() {
      if (!isLoggedIn()) {
        router.push("/login");
        return;
      }
      const userData = await getUserData();
      setUserData(userData);
    }
    go();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  type TimeEntry = {
    pay_rate: string;
    start: string;
    end: string;
  }

  type UserTimeData = {
    email: string;
    first_name: string;
    last_name: string;
    time_entries: TimeEntry[];
  }

  type UserAccountData = {
    id: number;
    first_name: string;
    last_name: string;
    pay_rate: string;
    is_manager: boolean;
    email_address: string;
  }

  type FullUserData = {
    time: UserTimeData;
    account: UserAccountData;
  }

  const typedUserData = userData as FullUserData;

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
  };


  return (
    <>
    <Taskbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="container mx-auto py-10 px-4">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-6xl font-bold mb-8 font-playfair text-black-700">
              {typedUserData.account.first_name} {typedUserData.account.last_name}'s Dashboard
            </h1>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <p className="border p-2 rounded w-full text-gray-700">{typedUserData.account.email_address}</p>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Time Entries</label>
                <div className="border rounded w-full">
                  <div className="overflow-y-auto max-h-72">
                    {typedUserData.time.time_entries.map((entry, index) => (
                      <div
                        key={index}
                        className={`border-b flex justify-between py-2 px-4 "bg-white"
                        hover:bg-blue-200 transition-colors duration-150`}
                      >
                        <div>
                          <span className="font-bold text-gray-700">Pay Rate:</span> {entry.pay_rate}
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">Start:</span> {formatDate(entry.start)}
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">End:</span> {formatDate(entry.end)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick = {() => router.push("/me/manage")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">View Managed Employees</button>
            <button onClick = {() => router.push("/me/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add New Time Entry</button>
          </div>
        </div>
      </div>
    </>
  );
}