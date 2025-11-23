import SalesHeader from "./SalesHeader"
import SalesPagination from "./SalesPagination"
import SalesTable from "./SalesTable"


const SalesBody = () => {
  return (
    <div>
      <SalesHeader></SalesHeader>

      {/* Table */}
      <div>
        <SalesTable></SalesTable>
      </div>

      {/* Pagination */}
      <div>
        <SalesPagination></SalesPagination>
      </div>
    </div>
  )
}

export default SalesBody