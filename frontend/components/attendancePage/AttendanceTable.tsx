"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const AttendanceTable = () => {
  // Dummy employee data
  const employees = [
    { name: "John Doe", designation: "Manager", email: "john@example.com" },
    { name: "Jane Smith", designation: "Accountant", email: "jane@example.com" },
    { name: "Alex Johnson", designation: "Employee", email: "alex@example.com" },
    { name: "Maria Garcia", designation: "Employee", email: "maria@example.com" },
    { name: "David Brown", designation: "Employee", email: "david@example.com" },
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>
            Leave <div className="text-xs text-gray-400">{today}</div>
          </TableHead>
          <TableHead>
            Attendance <div className="text-xs text-gray-400">{today}</div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.map((emp, indx) => (
          <TableRow key={indx}>
            <TableCell>{indx + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.designation}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>
              <Switch />
            </TableCell>
            <TableCell>
              <Switch />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
