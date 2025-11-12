"use client"
import { useState } from "react";
import AttendanceHeader from "./AttendanceHeader";
import AttendancePagination from "./AttendancePagination";
import AttendanceSummeryCar from "./AttendanceSummeryCar";
import AttendanceTable from "./AttendanceTable";

const AttendanceBody = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      {/* Summery Card */}
      <div>
        <AttendanceSummeryCar></AttendanceSummeryCar>
      </div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <AttendanceHeader searchTerm={searchTerm || ""} setSearchTerm={setSearchTerm}></AttendanceHeader>
        <div className="border border-border rounded">
          <AttendanceTable searchTerm={searchTerm}></AttendanceTable>
        </div>
        <div>
          <AttendancePagination />
        </div>
      </div>
    </div>
  );
};

export default AttendanceBody;
