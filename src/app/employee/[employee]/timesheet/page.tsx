import { url } from "inspector";
import { BlockList } from "net";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import bg from "../Granite.jpeg";

const style = {
  backgroundImage: "url(${bg})",
  backgroundSize: "cover",
};

const TimesheetInput = (employee: string) => {
  const employeeName = employee;
  return (
    <div className="bg-[url('/Granite.jpeg')] bg-cover min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-row" style={{ justifyContent: "space-between" }}>
          <h1 className="text-6xl font-bold mb-8 font-playfair">Log Your Shift:</h1>
          <h2 className="font-playfair font-bold text-xl" style={{ marginTop: "23px" }}>{employeeName}</h2>
        </div>
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
          <Link href={"employee/" + employee}>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-gray-500 hover:text-white-500 text-white text-hover font-bold py-2 px-4 rounded"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { employee: string } }) {
  return TimesheetInput(params.employee);
}
