"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useCallback, useEffect } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { debounce } from "lodash";

const ProductTable = ({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: number;
}) => {
  const { employees, getAllEmployees, isLoading } = useEmployeeStore();

  // debounce
  const debouncedGetEmployees = useCallback(
    debounce((term: string, page: number) => {
      getAllEmployees(term, page);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedGetEmployees(searchTerm, currentPage);

    // cleanup to cancel debounce on unmount
    return () => {
      debouncedGetEmployees.cancel();
    };
  }, [searchTerm, currentPage, debouncedGetEmployees]);
  
  if (isLoading) return <TableSkeleton></TableSkeleton>;

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
        {employees.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-gray-500 py-4">
              No employees found
            </TableCell>
          </TableRow>
        ) : (
          employees.map((employee, indx) => (
            <TableRow key={employee._id}>
              <TableCell>{indx + 1}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>
                <UpdateEmployee empId={employee._id}></UpdateEmployee>
              </TableCell>
              <TableCell>
                <DeleteEmployee empId={employee._id}></DeleteEmployee>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
