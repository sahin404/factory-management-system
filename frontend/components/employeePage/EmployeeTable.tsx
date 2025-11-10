"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "../ui/button";

const ProductTable = () => {
  const employees = [
    {
      _id: "1",
      name: "Md. Sahin Alam",
      role: 'admin',
      email: "sahinraj25@gmail.com",
      salary:'20000',
    },
  ];

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.map((employee, indx) => (
          <TableRow key={employee._id}>
            <TableCell>{indx + 1}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.salary}</TableCell>
            <TableCell>
              <Button className="bg-yellow-600 text-white rounded hover:bg-yellow-500">Update</Button>
            </TableCell>
            <TableCell>
              <Button className="bg-red-700 text-white rounded hover:bg-red-600">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
