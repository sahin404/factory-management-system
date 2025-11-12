import Attendance from "./attendance.model"

// Update attendance
export const updateAttendance = async(empId:string, status:'present'| 'absent'|'leave', date:string)=>{
    const response = await Attendance.findOneAndUpdate({employeeId:empId, date}, {status}, {new:true, upsert:true});
    return response;
}