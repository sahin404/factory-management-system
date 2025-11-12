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
import { useEmployeeStore } from "@/stores/employeeStore";
import { useEffect } from "react";
import TableSkeleton from "../TableSkeleton";

const AttendanceTable = ({searchTerm}:{searchTerm:string}) => {
  
  const {isLoading, employees, getAllEmployees} = useEmployeeStore();

  useEffect(()=>{
    getAllEmployees(searchTerm, 1);
  },[getAllEmployees, searchTerm])

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if(isLoading) return <TableSkeleton></TableSkeleton>

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
            <TableCell>{emp.role}</TableCell>
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
