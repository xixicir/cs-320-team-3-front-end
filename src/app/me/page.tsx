"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../auth";
import { Taskbar } from "../page"
import Chart from 'react-apexcharts';

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
  
  
  const [showGraph, setShowGraph] = useState(false);
    
  const toggleView = () => {
    setShowGraph(!showGraph);
  };
  
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
    manager: string;
    position: string;
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

  const formatDateGraph = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const formatHours = (date1: string, date2: string): float => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return ((d2.getTime() - d1.getTime()) / 3600000).toFixed(2);
  };

  const timeEntries = typedUserData.time.time_entries;

  const timeLabels = timeEntries.map(entry => formatDateGraph(entry.start));
  const payRates = timeEntries.map(entry => entry.pay_rate);
  const hoursWorked = timeEntries.map(entry => formatHours(entry.start, entry.end));

  const chartData = {
    series: [
      {
        name: 'Hours Worked',
        data: hoursWorked,
      },
      {
        name: 'Pay Rate',
        data: payRates,
      },
    ],
    options: {
      chart: {
        id: 'dashboard-chart',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: timeLabels,
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      legend: {
        fontSize: '14px',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Taskbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-700">
        <div className="container mx-auto py-10 px-4">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-center text-4xl font-bold mb-8 text-indigo-700 tracking-tight">
              Dashboard <br />
              <span className="text-2xl font-light text-gray-600">
                {typedUserData.account.first_name} {typedUserData.account.last_name}
              </span>
            </h1>
            <div className="space-y-8">
              <div className="border bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                <div>
                  <label className="block mb-1 text-gray-600">Email</label>
                  <p className="px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {typedUserData.account.email_address}
                  </p>
                  <br></br>
                </div>
                <div>
                  <label className="block mb-1 text-gray-600">Position</label>
                  <p className="px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {typedUserData.account.position}
                  </p>
                  <br></br>
                </div>
                <div>
                  <label className="block mb-1 text-gray-600">Manager</label>
                  <p className="px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {typedUserData.account.manager || "None"}
                  </p>
                </div>
              </div>

              <div className="border bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Entries</h2>
                <div className="flex justify-center">
                    <button
                      onClick={toggleView}
                      className={`${
                        !showGraph
                          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                          : 'bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r'
                      }`}
                    >
                      Table
                    </button>
                  <button
                      onClick={toggleView}
                      className={`${
                        showGraph
                          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                          : 'bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l'
                      }`}
                    >
                      Graph
                    </button>
                </div>
                {showGraph ? (
                  <div className="h-96">
                      <Chart options={chartData.options} series={chartData.series} type="line" height="100%" />
                  </div>
                ) : (
                  <div className="w-full overflow-y-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                    <table className="min-w-full divide-y divide-gray-200 align-middle text-sm">
                      <thead>
                        <tr>
                          <th className="sticky top-0 bg-white py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Pay Rate</th>
                          <th className="sticky top-0 bg-white py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Start</th>
                          <th className="sticky top-0 bg-white py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">End</th>                  
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {typedUserData.time.time_entries.map((entry, index) => (
                          <tr
                            key={index}
                            className="cursor-pointer hover:bg-blue-100 transition-colors duration-150"
                          >
                            <td className="py-4 px-6 text-gray-900">{`$${entry.pay_rate}`}</td>
                            <td className="py-4 px-6 text-gray-900">{formatDate(entry.start)}</td>
                            <td className="py-4 px-6 text-gray-900">{formatDate(entry.end)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}