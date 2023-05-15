"use client"

import { useRouter } from "next/navigation";
import { getManageeTimeData } from "../../../auth";
import React from "react";
import { useEffect, useState } from "react";

export default function Page({params, }: {params: {managee: string}}) {
    const router = useRouter();
    const [manageeTimeData, setManageeTimeData] = useState<any>(null);
    const [specificManageeData, setSpecificManageeData] = useState<any>(null);
    const formatDate = (date: string): string => {
        return new Date(date).toLocaleString();
    };

    useEffect(()=>{
        
        const indicator = "%40"
        const indicatorLoc = params.managee.lastIndexOf(indicator)
        let properEmailParam = params.managee
        if(indicatorLoc > -1)
        {
            properEmailParam = params.managee.slice(0, indicatorLoc) + "@" + params.managee.slice(indicatorLoc+3, params.managee.length)
        }

        async function getAndStoreData()
        {
            const employeeTimeData = await getManageeTimeData()
            setManageeTimeData(employeeTimeData)
            let specificManagee = null

            if(employeeTimeData === null || employeeTimeData === undefined)
            {
                setManageeTimeData(undefined)
                setSpecificManageeData(undefined)
            }
            else{
                specificManagee = await employeeTimeData.employeesTimeData.find((element: any) => (element.email === properEmailParam))
            }

            setSpecificManageeData(specificManagee)
        }

        getAndStoreData()
    }, [])

    if(manageeTimeData === null || specificManageeData === null)
    {
        return <div>Fetching Managee Data...</div>;
    }

    if(manageeTimeData === undefined)
    {
        return <div>Error: No General Managee Data</div>
    }

    if(specificManageeData === undefined)
    {
        return <div>Error: Specific Managee not found</div>
    }

    return (
        <div className="min-h-screen">
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-6xl font-bold mb-8 font-playfair text-center">
            {specificManageeData.first_name} {specificManageeData.last_name}'s Dashboard
          </h1>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block mb-2">Email</label>
              <p className="border p-2 rounded w-full">{specificManageeData.email_address}</p>
            </div>
            <div>
              <label className="block mb-2">Time Entries</label>
              <div className="border p-2 rounded w-full space-y-4">
                {specificManageeData.time_entries.map((entry: any, index: any) => (
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
    )
}