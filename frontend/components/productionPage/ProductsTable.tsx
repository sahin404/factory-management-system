"use client";

import { debounce } from "lodash";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useProductStore } from "@/stores/productStore";
import { useCallback, useEffect } from "react";
import TableSkeleton from "../TableSkeleton";

const ProductTable = ({ searchTerm, pagination }: {searchTerm: string, pagination:number}) => {
  const { products, isLoading, getProducts } = useProductStore();

  // console.log(searchTerm, pagination);
  const debouncedGetProducts = useCallback(
    debounce((searchTerm:string, pagination:number) => {
      getProducts(searchTerm, pagination);
    }, 500),
    [getProducts]
  );

  useEffect(() => {
    debouncedGetProducts(searchTerm, pagination);
    // cleanup
    return () => debouncedGetProducts.cancel();
  }, [searchTerm,pagination, debouncedGetProducts]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!products || products.length === 0) {
    return <p className="text-center py-4">No products available.</p>;
  }

  return (
    <Table className="min-w-[600px] text-md">
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
      <TableBody className="font-semibold">
        {products.map((product, indx) => (
          <TableRow key={product._id}>
            <TableCell>{indx + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>BDT {product.price}</TableCell>
            <TableCell>{product.unit}</TableCell>
            <TableCell>{product.quantity} Unit</TableCell>
            <TableCell>Add</TableCell>
            <TableCell>remove</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
