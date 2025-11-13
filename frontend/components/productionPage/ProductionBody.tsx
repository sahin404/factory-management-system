'use client'

import { useState } from "react"
import ProductionHeader from "./ProductionHeader"
import ProductTable from "./ProductsTable"
import ProductionPagination from "./ProductionPagination"

const ProductionBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <ProductionHeader searchTerm={searchTerm} setSearchTerm = {setSearchTerm} setCurrentPage={setCurrentPage}></ProductionHeader>
        <div className="border border-border rounded">
            <ProductTable searchTerm={searchTerm || ""} pagination={currentPage}></ProductTable>
        </div>
        <div>
          {
            !searchTerm &&  <ProductionPagination currentPage={currentPage} setCurrentPage={setCurrentPage}></ProductionPagination>
          }

        </div>
    </div>
  )
}

export default ProductionBody