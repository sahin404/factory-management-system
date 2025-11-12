import AttendanceHeader from "./AttendanceHeader";
import AttendancePagination from "./AttendancePagination";
import AttendanceSummeryCar from "./AttendanceSummeryCar";
import AttendanceTable from "./AttendanceTable";

const AttendanceBody = () => {
  return (
    <div>
      {/* Summery Card */}
      <div>
        <AttendanceSummeryCar></AttendanceSummeryCar>
      </div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <AttendanceHeader></AttendanceHeader>
        <div className="border border-border rounded">
          <AttendanceTable></AttendanceTable>
        </div>
        <div>
          <AttendancePagination />
        </div>
      </div>
    </div>
  );
};

export default AttendanceBody;
