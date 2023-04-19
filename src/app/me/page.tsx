"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../auth";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
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

  type UserData = {
    email: string;
    firstName: string;
    lastName: string;
    timeEntries: TimeEntry[]
  }

  type TimeEntry = {
    payRate: number;
    dateLogged: string;
    numHours: number;
  }
  const typedUserData = userData as UserData;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Timesheet Input for {employeeName}</h1>
        <form className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label htmlFor="startTime" className="block mb-2">Start Time</label>
              <input
                type="time"
                id="startTime"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="endTime" className="block mb-2">End Time</label>
              <input
                type="time"
                id="endTime"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="date" className="block mb-2">Date</label>
              <input
                type="date"
                id="date"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
