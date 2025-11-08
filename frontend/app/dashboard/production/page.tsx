import ProductionBody from "@/components/productionPage/ProductionBody";
import ProductionHeader from "@/components/productionPage/ProductionHeader";
import ProductionPagination from "@/components/productionPage/ProductionPagination";
import ProductTable from "@/components/productionPage/ProductsTable";
//server component
const production = async () => {
  return (
    <div className="">
      {/* Header */}
      <h1 className="text-2xl font-semibold">All Production</h1>
      
      {/* Body */}
      <ProductionBody></ProductionBody>
    </div>
  );
};

export default production;
