import SalaryHeader from "./SalaryHeader";
import SalaryPagination from "./SalaryPagination";
import SalarySummeryCard from "./SalarySummeryCard";

const SalaryBody = () => {
  return (
    <div>
      {/* Summery Card */}
      <div>
        <SalarySummeryCard></SalarySummeryCard>
      </div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <SalaryHeader></SalaryHeader>
        <div className="border border-border rounded">
          <SalaryPagination></SalaryPagination>
        </div>
        <div>
          <SalaryPagination></SalaryPagination>
        </div>
      </div>
    </div>
  );
};

export default SalaryBody;
