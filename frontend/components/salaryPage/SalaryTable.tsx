"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const SalaryTable = () => {
  // Dummy employee data
  const employees = [
    { id: 1, name: "Shahin Alam", role: "Production Manager", email: "shahin@example.com", status: "paid" },
    { id: 2, name: "Rafiul Hasan", role: "Machine Operator", email: "rafiul@example.com", status: "unpaid" },
    { id: 3, name: "Tanim Rahman", role: "Supervisor", email: "tanim@example.com", status: "paid" },
    { id: 4, name: "Mehedi Hasan", role: "Accountant", email: "mehedi@example.com", status: "unpaid" },
  ];

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.map((emp, index) => (
          <TableRow key={emp.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.role}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>
              <ToggleGroup
                variant="outline"
                type="single"
                value={emp.status}
              >
                <ToggleGroupItem
                  value="paid"
                  aria-label="Paid"
                  className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                >
                  Paid
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="unpaid"
                  aria-label="Unpaid"
                  className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                >
                  Unpaid
                </ToggleGroupItem>
              </ToggleGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalaryTable;
