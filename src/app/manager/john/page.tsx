import Link from 'next/link';
import React from 'react';

const ManagerPage = () => {
  const managerName = 'John Doe';
  const employees = [
    { id: 1, name: 'Alice', hoursWorked: 40, averageSalary: 50000 },
    { id: 2, name: 'Bob', hoursWorked: 45, averageSalary: 55000 },
    { id: 3, name: 'Carol', hoursWorked: 35, averageSalary: 45000 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Manager: {managerName}</h1>
        <div className="flex flex-col">
          <div className="flex bg-gray-200 text-sm font-semibold">
            <div className="px-4 py-2 w-1/3">Employee Name</div>
            <div className="px-4 py-2 w-1/3">Total Hours Worked</div>
            <div className="px-4 py-2 w-1/3">Average Salary</div>
          </div>
          {employees.map((employee) => (
            <div key={employee.id} className="flex bg-white border-t">
                <Link href={`/employee/${employee.name}`}>
                    <div className="px-4 py-2 w-1/3">{employee.name}</div>
                </Link>
              <div className="px-4 py-2 w-1/3">{employee.hoursWorked}</div>
              <div className="px-4 py-2 w-1/3">${employee.averageSalary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
    return <ManagerPage/>
}