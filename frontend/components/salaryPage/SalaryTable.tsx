"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSalaryStore } from "@/stores/salaryStore";
import { useCallback, useEffect, useState } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";
import { debounce } from "lodash";

interface searchProps {
  searchTerm: string;
  currentPage: number;
}

const SalaryTable = ({ searchTerm, currentPage }: searchProps) => {
  const [firstLoad, setFirstLoad] = useState(true);

  const {
    salaryInformations,
    isLoading,
    getSalaryInformations,
    addSalaryInformation,
  } = useSalaryStore();

  // Previous Month
  const getPreviousMonth = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };
  const month = getPreviousMonth();

  // debounce fetch
  const debouncedGetSalary = useCallback(
    debounce(async (month: string, term: string, page: number) => {
      await getSalaryInformations(month, term, page);
      setFirstLoad(false); // first fetch done
    }, 500),
    [getSalaryInformations]
  );

  useEffect(() => {
    debouncedGetSalary(month, searchTerm, currentPage);
    return () => debouncedGetSalary.cancel();
  }, [searchTerm, currentPage, debouncedGetSalary]);

  // Handle toggle
  const handleToggle = (empId: string, value: string) => {
    if (!value) return;
    addSalaryInformation(empId, value, month);
  };

  // Skeleton loader
  const shouldSkeletonOpen =
    salaryInformations.length === 0 && (firstLoad || isLoading);
  if (shouldSkeletonOpen) return <TableSkeleton />;

  if (!isLoading && salaryInformations.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No employees found.
      </div>
    );
  }

  return (
    <Table className="min-w-[600px] border border-gray-200">
      <TableHeader className="bg-gray-100">
        <TableRow className="">
          <TableHead className="dark:text-black">Serial</TableHead>
          <TableHead className="dark:text-black">Name</TableHead>
          <TableHead className="dark:text-black">Email</TableHead>
          <TableHead className="dark:text-black">Salary</TableHead>
          <TableHead className="dark:text-black">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {salaryInformations.map((emp, index) => (
          <TableRow key={emp.empId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.salary}</TableCell>

            <TableCell>
              <ToggleGroup
                type="single"
                value={emp.status || 'unpaid'}
                onValueChange={(value) => handleToggle(emp.empId, value)}
              >
                <ToggleGroupItem
                  value="unpaid"
                  className="px-3 data-[state=on]:bg-red-500 data-[state=on]:text-white"
                >
                  Unpaid
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="paid"
                  className="px-3 data-[state=on]:bg-green-500 data-[state=on]:text-white"
                >
                  Paid
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
