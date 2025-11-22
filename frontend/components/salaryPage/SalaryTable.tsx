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
import { useEffect, useState } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";


const SalaryTable = () => {

  const [firstLoad, setFirstLoad] = useState(true);

  const {salaryInformations, isLoading, getSalaryInformations} = useSalaryStore();

  useEffect(()=>{
    const getInfo = async()=>{
      await getSalaryInformations('october');
      setFirstLoad(false);
    }
    getInfo();
  },[])


  const shouldSkeletonOpen = salaryInformations.length===0 && (firstLoad || isLoading);

  if(shouldSkeletonOpen) return <TableSkeleton></TableSkeleton>


   return (
    <Table className="min-w-[600px] border border-gray-200">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {salaryInformations.map((emp, index) => (
          <TableRow key={emp._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.salary}</TableCell>
            <TableCell>
              <ToggleGroup
                type="single"
                value={emp.salaryStatus}
                className="border rounded"
              >
                <ToggleGroupItem value="unpaid" className="px-3 py-1 data-[state=on]:bg-red-500 data-[state=on]:text-white">
                  Unpaid
                </ToggleGroupItem>
                <ToggleGroupItem value="paid" className="px-3 py-1 data-[state=on]:bg-green-500 data-[state=on]:text-white">
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

export default SalaryTable