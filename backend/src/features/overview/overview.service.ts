import Attendance from "../attendance/attendance.model";
import User from "../auth/auth.model"

// get total employees
export const getTotalEmployees = async()=>{
     const total = await  User.countDocuments();
     return total-1;
}

// get present employees
export const getPresentEmployees =async(date:string)=>{
    const response = await Attendance.find({
        date,
        status:'present'
    })
    return response;
}