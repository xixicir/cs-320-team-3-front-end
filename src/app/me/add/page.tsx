"use client"
import { getAuthHeader } from "@/app/auth";
import { API_ENDPOINT } from "@/lib/globals";
import { parseISO, } from "date-fns";
import { useRouter } from "next/navigation";
import { Taskbar } from "../../page"
import React, { useState } from "react";
import { utcToZonedTime } from 'date-fns-tz';
import WithNoSSR from "@/app/components/withNoSSR";
import fetchToCurl from "fetch-to-curl";

function isValidDateString(dateString: string) {
  const date = parseISO(dateString);
  return isValidDate(date);
}

function isValidDate(date: Date) {
    return date.toString() !== "Invalid Date";
}

const TimesheetInput = ({ employee } : { employee: string}) => {
  const employeeName = employee;
  const router = useRouter()
  const [timeEntry, setTimeEntry] = useState<null | { start: string; end: string}>(null);

  const handleChange = (event: any) => {
    const startTime = event.target.form.startTime.value;
    const endTime = event.target.form.endTime.value;
    const day = event.target.form.date.value;
    const allExist = startTime && endTime && day;
    if (!allExist || !isValidDateString(day)) {
        setTimeEntry(null)
        return
    }
    if (allExist && isValidDateString(day)) {
        const fullStartTime = `${day}T${startTime}:00.000Z`
        const fullEndTime = `${day}T${endTime}:00.000Z`
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        const start = utcToZonedTime(parseISO(fullStartTime), timezone);
        const end = utcToZonedTime(parseISO(fullEndTime), timezone);

        if (!isValidDate(start) || !isValidDate(end)) {
            setTimeEntry(null)
            return
        }

        setTimeEntry({
            start: fullStartTime,
            end: fullEndTime,
        })
    }
  };

  const handleSubmit = async (event: any) => {
      event.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            ...getAuthHeader(),
        },
        body: JSON.stringify(timeEntry),
      };

      const URL = API_ENDPOINT + `time/log`;
      const response = await fetch(URL, requestOptions);

      if (!response.ok) {
        console.log(`Request failed:`)
        console.log(fetchToCurl(URL, requestOptions))
      }

      // if response was success, redirect to me
      if (response.ok) {
          router.push("/me");
      }
  };

  return (
    <>
    <Taskbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-700">
        <div className="container mx-auto py-10 px-4">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-center text-4xl font-bold mb-4 text-indigo-700 tracking-tight">Log Your Shift</h1>
            <h2 className="text-center text-2xl font-light text-gray-600 mb-8">{employeeName}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label htmlFor="startTime" className="block mb-1 text-gray-600">Start Time</label>
                  <input
                    type="time"
                    id="startTime"
                    className="px-2 py-1 rounded bg-gray-100 text-gray-600 w-full"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block mb-1 text-gray-600">End Time</label>
                  <input
                    type="time"
                    id="endTime"
                    className="px-2 py-1 rounded bg-gray-100 text-gray-600 w-full"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-1 text-gray-600">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="px-2 py-1 rounded bg-gray-100 text-gray-600 w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!Boolean(timeEntry)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  
};


export default function Page({ params }: { params: { employee: string } }) {
  return <WithNoSSR>
    <TimesheetInput employee={params.employee} />
  </WithNoSSR>
}
