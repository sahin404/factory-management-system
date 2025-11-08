"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Person = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
};

const data: Person[] = [
  {
    id: 1,
    name: "shadcn",
    email: "shadcn@example.com",
    age: 26,
    role: "Pro Developer",
  },
  {
    id: 2,
    name: "Ahdeetai",
    email: "ahdeetai@example.com",
    age: 21,
    role: "Cool Developer",
  },
  {
    id: 3,
    name: "ManuArora",
    email: "manuarora@example.com",
    age: 35,
    role: "Ace Developer",
  },
  {
    id: 4,
    name: "DavidHaz",
    email: "davidhaz@example.com",
    age: 27,
    role: "Top Developer",
  },
  {
    id: 5,
    name: "Roy",
    email: "roy@example.com",
    age: 31,
    role: "Star Developer",
  },
];

const ProductTable=()=> {
  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>ProductName</TableHead>
          <TableHead>Price/Piece</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Add Product</TableHead>
          <TableHead>Delete Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.id}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.email}</TableCell>
            <TableCell>{p.age}</TableCell>
            <TableCell>{p.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export default ProductTable;