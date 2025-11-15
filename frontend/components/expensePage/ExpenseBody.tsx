'use client'

import { useState } from "react";
import ExpenseHeader from "./ExpenseHeader"
import ExpenseTable from "./ExpenseTable"

const ExpenseBody = () => {
  const [filter, setFilter] = useState("recent");
  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <div className="">
          <ExpenseHeader filter={filter} setFilter={setFilter}></ExpenseHeader>
        </div>

        {/* Table */}
        <div className="border border-border rounded">
            <ExpenseTable filter={filter}></ExpenseTable>
        </div>

        {/* Pagination */}
        <div>
          
        </div>
      </div>
  )
}

export default ExpenseBody