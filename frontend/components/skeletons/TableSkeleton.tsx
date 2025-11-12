"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const TableSkeleton = () => {
  const rows = Array(5).fill(0); // 5 placeholder rows

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Add Product</TableHead>
          <TableHead>Delete Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
