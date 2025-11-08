"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProductionHeader = () => {
  return (
    <div className="flex justify-between gap-5">
      <h1 className=" w-1/3 text-2xl">All production</h1>
      <div className="flex-1">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search a product..."
            className="w-full px-4 py-2 text-md border rounded-2xl outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
          />

          <div className="w-1/6">
            <Button className="bg-green-800 text-md">
              <Plus />
              Add new Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionHeader;
