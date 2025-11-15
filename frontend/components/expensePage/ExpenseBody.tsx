'use client'

import ExpenseHeader from "./ExpenseHeader"
import ExpenseTable from "./ExpenseTable"

const ExpenseBody = () => {
  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <div className="">
          <ExpenseHeader></ExpenseHeader>
        </div>

        {/* Table */}
        <div className="border border-border rounded">
            <ExpenseTable></ExpenseTable>
        </div>

        {/* Pagination */}
        <div>
          
        </div>
      </div>
  )
}

export default ExpenseBody