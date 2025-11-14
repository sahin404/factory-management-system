import Salary from "./salary.model"


// add salary information into daabase
export const addSalaryInformation = async(empId:string, salaryStatus:string, month:string)=>{
    const newData = new Salary({empId, salaryStatus, month});
    await newData.save();

    return newData;
}