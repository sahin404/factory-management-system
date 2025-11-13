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
import PaginationSkeleton from "./skeletons/PaginationSkeleton";
import { useProductStore } from "@/stores/productStore";

interface pageNationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const PaginationPage = ({
  currentPage,
  setCurrentPage,
}: pageNationProps) => {
  const { totalEmployees, isLoading } = useEmployeeStore();
  const {isLoading:productionLoading} = useProductStore();


  if (isLoading) return <PaginationSkeleton></PaginationSkeleton>;

  const limit = 10;
  const totalPages = Math.ceil(totalEmployees / limit);
  // create array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentPage === page
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
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
