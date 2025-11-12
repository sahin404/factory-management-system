"use client";

import React from "react";

const AttendanceSummaryCard = () => {
  // Dummy data
  const totalEmployees = 50;
  const present = 35;
  const absent = 10;
  const leave = 5;

  const summary = [
    { title: "Present", value: present, color: "bg-green-500" },
    { title: "Absent", value: absent, color: "bg-red-500" },
    { title: "Leave", value: leave, color: "bg-blue-500" },
    { title: "Total Employees", value: totalEmployees, color: "bg-gray-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {summary.map((item) => (
        <div
          key={item.title}
          className={`p-4 rounded shadow flex flex-col items-center justify-center ${item.color} text-white`}
        >
          <span className="text-lg font-semibold">{item.value}</span>
          <span className="text-sm">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default AttendanceSummaryCard;
