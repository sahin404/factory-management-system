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
import { useCallback, useEffect, useState } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";
import { debounce } from "lodash";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useAttendanceStore } from "@/stores/attendanceStore";

const AttendanceTable = ({searchTerm,currentPage,}: {searchTerm: string,currentPage: number;}) => {
  const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
  
  //store
  const { isLoading, employees, getAllEmployees } = useEmployeeStore();
  const {attendances,updateAttendance, getAllAttendance, isLoading: attendanceLoading,} = useAttendanceStore();

  // fetching employee with debouncing
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


  // today date calculate and make string
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", });

  // Fetch attendance data when employees or date change
  useEffect(() => {
    if (employees.length > 0) {
      getAllAttendance(today);
    }
  }, [employees, today]);

  // Sync backend attendance to local state
  useEffect(() => {
    const newAttendance: { [key: string]: "present" | "absent" | "leave" } = {};
    employees.forEach((emp) => {
      const att = attendances.find((a) => a.employeeId === emp._id);
      newAttendance[emp._id] = att ? att.status : "absent";
    });
    setAttendance(newAttendance);
  }, [attendances, employees]);

  // handle attendance change and save to database
  const handleAttendanceChange = async (
    empId: string,
    status: "present" | "absent" | "leave"
  ) => {
    setAttendance((prev) => ({ ...prev, [empId]: status }));
    // console.log(`Employee ${empId} marked as ${status}`);
    await updateAttendance(empId, status, today);
  };

  if (isLoading || attendanceLoading) return <TableSkeleton />;

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>
            Status <div className="text-xs text-gray-400">{today}</div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500 py-4">
              No employees found
            </TableCell>
          </TableRow>
        ) : (
          employees.map((emp, indx) => (
            <TableRow key={indx}>
              <TableCell>{indx + 1}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.email}</TableCell>
              {/* Toggole Group*/}
              <TableCell>
                <ToggleGroup
                  variant={"outline"}
                  type="single"
                  value={attendance[emp._id] || "absent"}
                  onValueChange={(val) => {
                    if (val)
                      handleAttendanceChange(
                        emp._id,
                        val as "present" | "absent" | "leave"
                      );
                  }}
                >
                  <ToggleGroupItem
                    value="absent"
                    aria-label="Toggle bold"
                    className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                  >
                    A
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="present"
                    aria-label="Toggle italic"
                    className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                  >
                    P
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="leave"
                    aria-label="Toggle strikethrough"
                    className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  >
                    L
                  </ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
