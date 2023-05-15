"use client"
import { getAuthHeader } from "@/app/auth";
import { API_ENDPOINT } from "@/lib/globals";
import { parseISO, } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function isValidDateString(dateString: string) {
  const date = parseISO(dateString);
  return isValidDate(date);
}

function isValidDate(date: Date) {
    return date.toString() !== "Invalid Date";
}

const TimesheetInput = (employee: string) => {
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

        const start = parseISO(fullStartTime);
        const end = parseISO(fullEndTime);

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

      const response = await fetch(API_ENDPOINT + `time/log`, requestOptions);
      // if response was success, redirect to me
      if (response.ok) {
          router.push("/me");
      }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-row">
          <h1 className="text-6xl font-bold mb-8">Log Your Shift</h1>
          <h2 className="font-bold text-xl">{employeeName}</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label htmlFor="startTime" className="block mb-2">Start Time</label>
              <input
                type="time"
                id="startTime"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="endTime" className="block mb-2">End Time</label>
              <input
                type="time"
                id="endTime"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="date" className="block mb-2">Date</label>
              <input
                type="date"
                id="date"
                className="border p-2 rounded w-full"
                onChange={handleChange}
              />
            </div>
          </div>
            <button
              className="bg-blue-500 w-full text-white text-hover font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!Boolean(timeEntry)}
            >
              Submit
            </button>
        </form>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { employee: string } }) {
  return TimesheetInput(params.employee);
}
