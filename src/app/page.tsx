import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Time Tracker</h1>
        <p className="text-xl">Welcome to the Time Tracker application!</p>
        <a href="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded w-full"
        >
            Proceed to Login Page
        </a>
      </div>
    </div>
  );
};

export default function Page() {
  return <HomePage/>
}