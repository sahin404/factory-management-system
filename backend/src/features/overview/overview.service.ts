import Attendance from "../attendance/attendance.model";
import User from "../auth/auth.model"
import Salary from "../salary/salary.model";

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

// get salary staus
export const getSalaryStatus = async(month:string)=>{
    const paid= await Salary.find({
        month,
        status:'paid'
    });
    const paidCount = paid.length;
    const total = await  User.countDocuments();
    const unpaidCount = total-1-paidCount;

    return {paidCount, unpaidCount};
}