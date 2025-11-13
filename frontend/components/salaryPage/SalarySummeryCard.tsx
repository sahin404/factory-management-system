"use client";

import SummeryCardSkeleton from "../skeletons/SummeryCardSkeleton";

const SalarySummaryCard = () => {
  // dummy loading & data
  const isLoading = false;

  // dummy salary data (previous month)
  const totalEmployees = 25;
  const paid = 18;
  const unpaid = totalEmployees - paid;

  if (isLoading) return <SummeryCardSkeleton />;

  const summary = [
    { title: "Paid", value: paid, color: "bg-green-500" },
    { title: "Unpaid", value: unpaid, color: "bg-red-500" },
    { title: "Total Employees", value: totalEmployees, color: "bg-gray-500" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6 mt-5">
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

export default SalarySummaryCard;
