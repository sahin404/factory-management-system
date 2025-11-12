"use client";
import { useState } from "react";
import EmployeeHeader from "./EmployeeHeader";
import EmployeePagination from "./EmployeePagination";
import EmployeeTable from "./EmployeeTable";

const EmployeeBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <EmployeeHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />
        <div className="border border-border rounded">
          <EmployeeTable
            searchTerm={searchTerm || ""}
            currentPage={currentPage}
          ></EmployeeTable>
        </div>
        <div>
          <EmployeePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></EmployeePagination>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBody;
