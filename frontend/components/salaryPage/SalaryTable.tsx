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
import { useEmployeeStore } from "@/stores/employeeStore";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import TableSkeleton from "../skeletons/TableSkeleton";
import { useSalaryStore } from "@/stores/salaryStore";

const SalaryTable = ({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: number;
}) => {
  //states
  const [salary, setSalary] = useState<{ [key: string]: string }>({});

  //store
  const { isLoading, employees, getAllEmployees, resetEmployeesData } =
    useEmployeeStore();
  const {
    isLoading: salaryInformationLoading,
    salaryInformations,
    addSalaryInformation,
    getSalaryInformations,
  } = useSalaryStore();

  // fetching employee with debouncing
  const debouncedGetEmployees = useCallback(
    debounce((term: string, page: number) => {
      getAllEmployees(term, page);
    }, 500),
    [getAllEmployees]
  );
  useEffect(() => {
    resetEmployeesData();
    debouncedGetEmployees(searchTerm, currentPage);

    // cleanup to cancel debounce on unmount
    return () => {
      debouncedGetEmployees.cancel();
    };
  }, [searchTerm, currentPage, debouncedGetEmployees, resetEmployeesData]);

  // get previous month
  const getPreviousMonth = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };

  // call to get database salary inforrmation
  useEffect(() => {
    const month = getPreviousMonth();
    getSalaryInformations(month);
  }, [getSalaryInformations]);

  // check every employees and assign them their corresponding salary status
  useEffect(() => {
    const mapping: { [key: string]: string } = {};

    employees.forEach((emp) => {
      const checkFind = salaryInformations.find((si) => si.empId == emp._id);
      mapping[emp._id] = checkFind ? checkFind.salaryStatus : "unpaid";
    });

    setSalary(mapping);
  }, [employees, salaryInformations]);

  // call store to save salary information
  const handleToggoleChange = (value: string, id: string) => {
    const month = getPreviousMonth();
    addSalaryInformation(id, value, month);
  };

  // loading status
  if (isLoading || salaryInformationLoading)
    return <TableSkeleton></TableSkeleton>;

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
        {employees.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
              No employees found
            </TableCell>
          </TableRow>
        )}

        {employees.map((emp, index) => (
          <TableRow key={emp._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.role}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>
              <ToggleGroup
                variant="outline"
                type="single"
                onValueChange={(value) => handleToggoleChange(value, emp._id)}
                value={salary[emp._id] || "unpaid"}
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
