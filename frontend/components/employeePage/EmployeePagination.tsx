"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEmployeeStore } from "@/stores/employeeStore";
import PaginationSkeleton from "../PaginationSkeleton";

const EmployeePagination = () => {

  const {totalEmployees, isLoading} = useEmployeeStore();

  if(isLoading) return <PaginationSkeleton></PaginationSkeleton>
  
  const limit = 10;
  const totalPages = Math.ceil(totalEmployees/limit);
  // create array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  1 === page
                    ? "bg-green-700 text-white hover:text-white hover:bg-green-500 dark:hover:bg-green-500"
                    : "bg-white text-gray-700 hover:bg-gray-300 border"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EmployeePagination;
