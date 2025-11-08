import ProductionHeader from "@/components/productionPage/ProductionHeader";
import ProductionPagination from "@/components/productionPage/ProductionPagination";

//server component
const production = async () => {
  return (
    <div className="bg-red-500 mx-auto">
      {/* Header */}
      <ProductionHeader></ProductionHeader>
      {/* Table */}
      Table
      {/* Pagination */}
      <ProductionPagination></ProductionPagination>
    </div>
  );
};

export default production;
