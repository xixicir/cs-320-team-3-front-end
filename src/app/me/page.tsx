"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../auth";

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
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-6xl font-bold mb-8 font-playfair text-center">
          {typedUserData.account.first_name} {typedUserData.account.last_name}'s Dashboard
        </h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <p className="border p-2 rounded w-full">{typedUserData.account.email_address}</p>
          </div>
          <div>
            <label className="block mb-2">Time Entries</label>
            <div className="border p-2 rounded w-full space-y-4">
              {typedUserData.time.time_entries.map((entry, index) => (
                <div key={index} className="border-b flex justify-between py-2">
                  <div>
                    <span className="font-bold">Pay Rate:</span> {entry.pay_rate}
                  </div>
                  <div>
                    <span className="font-bold">Start:</span> {formatDate(entry.start)}
                  </div>
                  <div>
                    <span className="font-bold">End:</span> {formatDate(entry.end)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}