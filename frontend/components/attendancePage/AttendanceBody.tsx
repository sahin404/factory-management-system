"use client"
import { useState } from "react";
import AttendanceTable from "./AttendanceTable";
import PaginationPage from "../Pagination";
import InputField from "../InputField";

const AttendanceBody = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <InputField searchTerm={searchTerm || ""} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage}></InputField>
        <div className="border border-border rounded">
          <AttendanceTable searchTerm={searchTerm} currentPage={currentPage}></AttendanceTable>
        </div>
        <div>
          {!searchTerm &&
          <PaginationPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></PaginationPage>
          }
        </div>
      </div>
    </div>
  );
};

export default AttendanceBody;
