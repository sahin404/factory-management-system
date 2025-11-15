"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { useEffect } from "react";
import { useExpenseStore } from "@/stores/expenseStore";
import TableSkeleton from "../skeletons/TableSkeleton";
import DeleteExpenseButton from "./DeleteExpenseButton";



const applyFilter = (expenses: any[], filter: string) => {
  const now = new Date();

  return expenses.filter((exp) => {
    const expDate = new Date(exp.date);

    if (filter === "recent") {
      return expDate.toDateString() === now.toDateString();
    }

    if (filter === "week") {
      const diff = now.getTime() - expDate.getTime();
      return diff <= 7 * 24 * 60 * 60 * 1000;
    }

    if (filter === "month") {
      return (
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    }

    if (filter === "year") {
      return expDate.getFullYear() === now.getFullYear();
    }

    return true;
  });
};


const ExpenseTable = ({filter}:{filter:string}) => {

  const {getExpenses, isLoading, expenses} = useExpenseStore();
  useEffect(()=>{
    getExpenses();
  },[])

  if(isLoading) return <TableSkeleton></TableSkeleton>

  const filteredExpenses = applyFilter(expenses, filter);

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name & Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {filteredExpenses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-4">
              No expenses found
            </TableCell>
          </TableRow>
        ) : (
          filteredExpenses.map((exp, index) => (
            <TableRow key={exp._id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="font-semibold">{exp.name}</div>
                <div className="text-sm text-gray-500">{exp.description}</div>
              </TableCell>

              <TableCell>{exp.date}</TableCell>
              <TableCell>{exp.amount} TK</TableCell>

              <TableCell>
                <DeleteExpenseButton expId={exp._id || ""}></DeleteExpenseButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
