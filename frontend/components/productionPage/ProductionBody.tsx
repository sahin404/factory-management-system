import ProductionHeader from "./ProductionHeader"
import ProductTable from "./ProductTable"

const ProductionBody = () => {
  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <ProductionHeader></ProductionHeader>
        <div className="border-2 border-border rounded">
            <ProductTable></ProductTable>
        </div>
    </div>
  )
}

export default ProductionBody