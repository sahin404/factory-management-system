"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useProductStore } from "@/stores/productStore";
import { useEffect } from "react";


const ProductTable = () => {

  const {products, isLoading, getProducts} = useProductStore();

  useEffect(()=>{
    getProducts();
  },[getProducts])

  if (isLoading) {
    return <p className="text-center py-4">Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center py-4">No products available.</p>;
  }

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
        {products.map((product, indx) => (
          <TableRow key={product._id}>
            <TableCell>{indx+1}</TableCell>
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
