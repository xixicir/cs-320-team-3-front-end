import Link from "next/link";
import React from "react";
import { useParams } from "react-router-dom"



const Employee = (name: string) => {
  const employee = {
    name: name,
    hoursWorked: 30,
    shifts: [
      {
        id: 1,
        date: "Saturday, June 5th",
        startTime: "8AM",
        endTime: "5PM",
        payment: 200,
      },
      {
        id: 2,
        date: "Sunday, June 6th",
        startTime: "9AM",
        endTime: "3PM",
        payment: 150,
      },
    ],
  };

  return (
    <div className="bg-[url('/Granite.jpeg')] min-h-screen">
      <div className="container mx-auto py-10 px-4">
      <h1 className="text-xl text-center font-bold mb-2 letter-spacing:100 font-playfair">Employee </h1>
        <h1 className="text-8xl text-center font-bold mb-12 font-playfair">{employee.name}</h1>
        <h2 className="text-xl font-semibold mb-4">Total Hours Worked: {employee.hoursWorked}</h2>
        <div className="flex flex-col">
          <div className="flex bg-gray-200 text-sm font-semibold">
            <div className="px-4 py-2 w-2/5">Shift</div>
            <div className="px-4 py-2 w-2/5">Date</div>
            <div className="px-4 py-2 w-1/5">Payment</div>
          </div>
          {employee.shifts.map((shift) => (
            <div key={shift.id} className="flex bg-white border-t">
              <div className="px-4 py-2 w-2/5">
                {shift.startTime}-{shift.endTime}
              </div>
              <div className="px-4 py-2 w-2/5">{shift.date}</div>
              <div className="px-4 py-2 w-1/5">${shift.payment.toLocaleString()}</div>
            </div>
          ))}
          <Link href={'/employee/' + name + '/timesheet'}>
            <div className="bg-blue-500 hover:bg-gray-500 hover:text-white-500 text-center text-white font-bold py-2 px-4 rounded mt-4">
              Add Time
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Page({ params, 
}: { params: { employee: string };
}) {
  return Employee(params.employee)
};



//export default Employee;
