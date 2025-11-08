"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ProductionHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ProductionHeader = ({searchTerm, setSearchTerm}:ProductionHeaderProps) => {
  return (
    <div className="flex-1">
        <div className="flex gap-5">
          <input
            value={searchTerm || ""}
            onChange={(e)=>setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search a product..."
            className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
          />

          <div className="w-1/6">
            <Button className="bg-green-800 text-md text-white hover:bg-green-600 py-5">
              <Plus />
              Add new Product
            </Button>
          </div>

        </div>
      </div>
  );
};

export default ProductionHeader;
