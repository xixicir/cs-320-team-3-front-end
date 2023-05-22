"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getManageeTimeData, getManagerData, isLoggedIn } from "../../auth";
import { Taskbar } from "../../page"
import Chart from 'react-apexcharts';
import withNoSSR from "@/app/components/withNoSSR";
import WithNoSSR from "@/app/components/withNoSSR";


export function Page() {
  const router = useRouter();
  const [managerData, setManagerData] = useState<any>(null);
  const [manageeTimeData, setManageeTimeData] = useState<any>(null);

  const [showGraph, setShowGraph] = useState(false);
  
  const toggleView = () => {
    setShowGraph(!showGraph);
  };

  useEffect(() => {
    async function go() {
      if (!isLoggedIn()) {
        router.push("/login");
        return;
      }
      const managerData = await getManagerData();
      setManagerData(managerData);

      const manageeTimeData = await getManageeTimeData();
      setManageeTimeData(manageeTimeData);
    }
    go();
  }, []);

  if (managerData === null || manageeTimeData == null) {
    return <div>Loading...</div>;
  }

  const formatDateGraph = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const formatHours = (date1: string, date2: string): float => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return (d2.getTime() - d1.getTime()) / 3600000;;
  };

  function computeAvgManageeData() {
    let curData = {};

    manageeTimeData.employeesTimeData.forEach((item) => {
      for (const t of item.time_entries){
          const cmp = (a, b) => {
            return Date.parse(a.start) - Date.parse(b.start);
          }
          item.time_entries.sort(cmp);

          const k = formatDateGraph(t.start);
          if (!(k in curData)){
            curData[k] = {hours: 0, pay_rate: 0, n: 0};
          }
          curData[k].hours += formatHours(t.start, t.end)
          curData[k].pay_rate += parseFloat(t.pay_rate);
          curData[k].n += 1;
      }
    });

    return curData;
  }

  const timeEntriesAscending = computeAvgManageeData();

  const timeLabels = Object.keys(timeEntriesAscending);
  const payRates = Object.values(timeEntriesAscending).map(v => v.pay_rate);
  const hoursWorked = Object.values(timeEntriesAscending).map(v => v.hours);

  const payRatesAvg = Object.values(timeEntriesAscending).map(v => (v.pay_rate / v.n).toFixed(2));
  const hoursWorkedAvg = Object.values(timeEntriesAscending).map(v => (v.hours / v.n).toFixed(2));

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
    series2: [
      {
        name: 'Hours Worked',
        data: hoursWorkedAvg,
      },
      {
        name: 'Pay Rate',
        data: payRatesAvg,
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
              Managed Employees
            </h1>
            <div className="space-y-8">

              <div className="border bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Information</h2>

                <div className="w-full overflow-y-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                  <table className="min-w-full divide-y divide-gray-200 align-middle text-sm">
                    <thead>
                      <tr>
                      <th className="sticky top-0 bg-white py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="sticky top-0 bg-white py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>                  </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {managerData.account.list_employees.map((entry: any, index: any) => (
                        <tr
                          key={index}
                          onClick={(e) => router.push("/me/manage/" + entry.email_address)}
                          className="cursor-pointer hover:bg-blue-100 transition-colors duration-150"
                        >
                          <td className="py-4 px-6 text-gray-900">{`${entry.first_name} ${entry.last_name}`}</td>
                          <td className="py-4 px-6 text-gray-900">{entry.email_address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick = {() => (router.push("/me/manage/add_managee"))}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                      Add New Managee
                  </button>
                  <div className="flex justify-center mt-4">
                  </div>
                </div>
              </div>

              <div className="border bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Aggregate Data</h2>
                <div className="flex justify-center">
                    <button
                      onClick={toggleView}
                      className={`${
                        showGraph
                          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                          : 'bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r'
                      }`}
                    >
                      Total
                    </button>
                  <button
                      onClick={toggleView}
                      className={`${
                        !showGraph
                          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                          : 'bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l'
                      }`}
                    >
                      Average
                    </button>
                </div>
                
                {showGraph ? (
                  <div className="h-96">
                      <Chart options={chartData.options} series={chartData.series} type="line" height="100%" />
                  </div>
                ) : (
                  <div className="h-96">
                      <Chart options={chartData.options} series={chartData.series2} type="line" height="100%" />
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

export default () => <WithNoSSR><Page/></WithNoSSR>