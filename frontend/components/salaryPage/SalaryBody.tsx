'use client'

import { useState } from "react";
import SalaryTable from "./SalaryTable";
import PaginationPage from "../Pagination";
import InputField from "../InputField";

const SalaryBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <InputField searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage}></InputField>
        <div className="border border-border rounded">
          <SalaryTable searchTerm={searchTerm} currentPage={currentPage} />
        </div>
        <div>
          <PaginationPage currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationPage>
        </div>
      </div>
    </div>
  );
};

export default SalaryBody;
