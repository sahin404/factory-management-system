"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

// Dummy expense data
const dummyExpenses = [
  {
    _id: "1",
    name: "Office Rent",
    description: "Monthly office space rent",
    date: "12 Jan 2025",
    amount: 15000,
  },
  {
    _id: "2",
    name: "Internet Bill",
    description: "Broadband bill",
    date: "10 Jan 2025",
    amount: 1200,
  },
  {
    _id: "3",
    name: "Snacks Purchase",
    description: "Tea & biscuits",
    date: "09 Jan 2025",
    amount: 450,
  },
  {
    _id: "4",
    name: "Employee Bonus",
    description: "Performance bonus",
    date: "01 Jan 2025",
    amount: 5000,
  },
];

const ExpenseTable = () => {
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
        {dummyExpenses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-4">
              No expenses found
            </TableCell>
          </TableRow>
        ) : (
          dummyExpenses.map((exp, index) => (
            <TableRow key={exp._id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="font-semibold">{exp.name}</div>
                <div className="text-sm text-gray-500">{exp.description}</div>
              </TableCell>

              <TableCell>{exp.date}</TableCell>
              <TableCell>{exp.amount} TK</TableCell>

              <TableCell>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
