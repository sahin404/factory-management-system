"use client";

const AttendanceHeader = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex gap-5 items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search employee..."
        className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
      />

      {/* Today's Date (Unchangeable) */}
      <div className="flex items-center justify-center w-1/5 bg-green-800 text-white text-md rounded py-2 font-medium">
        Today: {today}
      </div>
    </div>
  );
};

export default AttendanceHeader;
