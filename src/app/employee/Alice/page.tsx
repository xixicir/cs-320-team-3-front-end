import Link from "next/link"
import React from 'react';

const Employee = () => {
  const employee = {
    name: 'Alice',
    hoursWorked: 40,
    shifts: [
      {
        id: 1,
        date: 'Saturday, June 5th',
        startTime: '8AM',
        endTime: '8PM',
        payment: 200,
      },
      {
        id: 2,
        date: 'Sunday, June 6th',
        startTime: '9AM',
        endTime: '6PM',
        payment: 150,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Employee: {employee.name}</h1>
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
        <Link href="/employee/Alice/timesheet">
          <div className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded mt-4">
            Add Time
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Employee;