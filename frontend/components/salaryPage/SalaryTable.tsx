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
  const [firstLoad, setFirstLoad] = useState(true);

  //store
  const {
    isLoading: empLoading,
    employees,
    getAllEmployees,
    fetched: empFetched,
  } = useEmployeeStore();

  const {
    isLoading: salaryLoading,
    salaryInformations,
    addSalaryInformation,
    getSalaryInformations,
    fetched: salaryFetched,
  } = useSalaryStore();

  // fetching employee with debouncing
  const debouncedGetEmployees = useCallback(
    debounce(async(term: string, page: number) => {
      await getAllEmployees(term, page);
    }, 500),
    [getAllEmployees]
  );


// 🔥 পরিবর্তন ৩: একটি সিঙ্ক করার useEffect যোগ করুন
  useEffect(() => {
    // এই useEffect টি শুধু মাত্র প্রথমবার লোড হওয়ার পরে `firstLoad` কে false করে দেবে।
    // যখন empFetched এবং salaryFetched উভয়ই true হবে (অথবা যখন লোডিং শেষ হবে), তখন প্রথম লোড শেষ।
    if (empFetched && salaryFetched && firstLoad) {
      setFirstLoad(false);
    }
    // যদি employees.length > 0 হয় এবং লোডিং শেষ হয়, তবুও false সেট করা যায়।
    if (!empLoading && !salaryLoading && (empFetched || salaryFetched) && firstLoad) {
      setFirstLoad(false);
    }

  }, [empFetched, salaryFetched, empLoading, salaryLoading, firstLoad]);


  useEffect(() => {
    debouncedGetEmployees(searchTerm, currentPage);
    console.log("Employee useeffect");
    // cleanup to cancel debounce on unmount
    return () => {
      debouncedGetEmployees.cancel();
    };
  }, [searchTerm, currentPage, debouncedGetEmployees]);


  

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
    // 🔥 পরিবর্তন ৪: month পরিবর্তিত হলে fetched ফ্ল্যাগটি reset করুন
    // NOTE: This assumes getSalaryInformations doesn't handle month change cache logic itself.
    // If you need to force a re-fetch when month changes, you must manually set `fetched: false` in the store.
    getSalaryInformations(month);
  }, [getSalaryInformations]);

  // check every employees and assign them their corresponding salary status
  useEffect(() => {
    if (employees.length > 0 && salaryInformations.length > 0) {
      const mapping: { [key: string]: string } = {};

      employees.forEach((emp) => {
        const checkFind = salaryInformations.find((si) => si.empId == emp._id);
        mapping[emp._id] = checkFind ? checkFind.salaryStatus : "unpaid";
      });

      setSalary(mapping);
    }
  }, [employees, salaryInformations]);

  // call store to save salary information
  const handleToggoleChange = (value: string, id: string) => {
    const month = getPreviousMonth();
    addSalaryInformation(id, value, month);
  };
  console.log('employee legth: ', employees.length);
  console.log('salary', salary);
  console.log("employee loading:", empLoading);
  console.log("salary loading:", salaryLoading);

  // loading status
  
   // Improved loading logic
  const isInitialOrRefetchLoading = empLoading || salaryLoading || firstLoad;
  const hasData = employees.length > 0;
  
  // স্কেলেটন দেখাও যদি: কোনো ডেটা না থাকে AND (হয় এটি প্রথম লোড OR কোনো ডেটা একটিভলি লোড হচ্ছে)
  const shouldShowSkeleton = !hasData && isInitialOrRefetchLoading;

  if (shouldShowSkeleton) {
    return <TableSkeleton />;
  }

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.length === 0 && empFetched && salaryFetched && !empLoading && !salaryLoading &&(
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
            <TableCell>{emp.salary}</TableCell>
            <TableCell>
              <ToggleGroup
                variant="outline"
                type="single"
                onValueChange={(value) => handleToggoleChange(value, emp._id)}
                value={salary[emp._id] || "unpaid"}
              >
                
                <ToggleGroupItem
                  value="unpaid"
                  aria-label="Unpaid"
                  className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                >
                  Unpaid
                </ToggleGroupItem>
                
                <ToggleGroupItem
                  value="paid"
                  aria-label="Paid"
                  className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
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
