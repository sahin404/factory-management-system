"use client";

interface AttendanceHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

const AttendanceHeader = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
}: AttendanceHeaderProps) => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex gap-5 items-center">
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
    </div>
  );
};

export default AttendanceHeader;
