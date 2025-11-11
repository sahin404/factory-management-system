'use client'
import { useState } from "react"
import EmployeeHeader from "./EmployeeHeader"
import EmployeePagination from "./EmployeePagination"
import EmployeeTable from "./EmployeeTable"

const EmployeeBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div>
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <EmployeeHeader searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        <div className="border border-border rounded">
            <EmployeeTable searchTerm={searchTerm || ""}></EmployeeTable>
        </div>
        <div>
          <EmployeePagination></EmployeePagination>
        </div>
    </div>
    </div>
  )
}

export default EmployeeBody