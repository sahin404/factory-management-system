"use client";

interface SalaryHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

const SalaryHeader = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
}: SalaryHeaderProps) => {
  // Previous month name বের করা
  const prevMonth = new Date();
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  const monthName = prevMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="flex gap-5 items-center justify-between">
      {/* Search Input */}
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        type="text"
        placeholder="Search employee..."
        className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
      />

      {/* Month Info */}
      <div className="text-gray-700 font-semibold whitespace-nowrap">
        Salary Month: <span className="text-green-700">{monthName}</span>
      </div>
    </div>
  );
};

export default SalaryHeader;
