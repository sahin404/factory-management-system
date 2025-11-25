"use client";

import { useEffect } from "react";
import { useOverviewStore } from "@/stores/overviewStore";
import { Users } from "lucide-react";

const PresentEmployees = () => {
  const {
    totalPresentEmployees,
    gettingPresentEmployees,
    getPresentEmployees,
  } = useOverviewStore();

  // today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getPresentEmployees(today);
  }, [today]);


  // todo: loading

  return (
    <div className="
      bg-white dark:bg-[#0f0f0f]
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-5 shadow-sm
      hover:shadow-md dark:hover:shadow-lg
      transition-all duration-300
      flex items-center justify-between
    ">
      
      {/* Left side */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Present Employees
        </p>

        {gettingPresentEmployees ? (
          <p className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-1"></p>
        ) : (
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
            {totalPresentEmployees}
          </h2>
        )}
      </div>

      {/* Right side icon box */}
      <div className="
        h-12 w-12 rounded-xl 
        bg-green-100 dark:bg-green-900/30 
        flex items-center justify-center
      ">
        <Users className="text-green-600 dark:text-green-400" size={26} />
      </div>

    </div>
  );
};

export default PresentEmployees;
