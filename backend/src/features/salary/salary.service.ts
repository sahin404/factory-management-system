import Salary from "./salary.model"


// add salary information into daabase
export const addSalaryInformation = async(empId:string, salaryStatus:string, month:string)=>{
    const newData = Salary.findOneAndUpdate(
        {month, empId},
        {salaryStatus},
        {upsert:true, new:true}
    )

    return newData;
}

// get salary information from database
export const getSalaryInformations = async(month:string)=>{
    const response = await Salary.find({month});
    return response;
}