import EmployeeHeader from "./EmployeeHeader"
import EmployeePagination from "./EmployeePagination"
import EmployeeTable from "./EmployeeTable"

const EmployeeBody = () => {
  return (
    <div>
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        <EmployeeHeader />
        <div className="border border-border rounded">
            <EmployeeTable></EmployeeTable>
        </div>
        <div>
          <EmployeePagination></EmployeePagination>
        </div>
    </div>
    </div>
  )
}

export default EmployeeBody