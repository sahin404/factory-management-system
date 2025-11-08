"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProductionHeader = () => {
  return (
    <div className="flex-1">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search a product..."
            className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
          />

          <div className="w-1/6">
            <Button className="bg-green-800 text-md hover:bg-green-600 py-5">
              <Plus />
              Add new Product
            </Button>
          </div>

        </div>
      </div>
  );
};

export default ProductionHeader;
