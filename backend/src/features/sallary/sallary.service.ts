import Salary from "./sallary.model"

export const addSalaryInformation = async(empId:string, salaryStatus:string, month:string)=>{
    const newData = new Salary({empId, salaryStatus, month});
    await newData.save();

    return newData;
}