'use client'

import { useState } from "react"
import ProductionHeader from "./ProductionHeader"
import ProductionPagination from "./ProductionPagination"
import ProductTable from "./ProductsTable"

const ProductionBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <ProductionHeader searchTerm={searchTerm} setSearchTerm = {setSearchTerm}></ProductionHeader>
        <div className="border border-border rounded">
            <ProductTable searchTerm={searchTerm || ""}></ProductTable>
        </div>
        <div>
          {/* <ProductionPagination></ProductionPagination> */}
        </div>
    </div>
  )
}

export default ProductionBody