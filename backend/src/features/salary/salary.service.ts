import User from "../auth/auth.model";
import Salary from "./salary.model";

// add salary information into daabase
export const addSalaryInformation = async (
  empId: string,
  salaryStatus: string,
  month: string
) => {
  const newData = Salary.findOneAndUpdate(
    { month, empId },
    { salaryStatus },
    { upsert: true, new: true }
  );

  return newData;
};

// get salary information from database
export const getSalaryInformations = async (month: string) => {
  const data = await User.aggregate([
    {
      $lookup: {
        from: "salaries", // Salary collection name
        localField: "_id", // User._id
        foreignField: "empId", // Salary.empId
        as: "salaryData",
      },
    },
    {
      $addFields: {
        salaryInMonth: {
          $filter: {
            input: "$salaryData",
            as: "s",
            cond: { $eq: ["$$s.month", month] },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        employeeId: 1,
        email: 1,
        salary: 1, // User.salary
        month: month,
        salaryStatus: {
          $ifNull: [
            { $arrayElemAt: ["$salaryInMonth.salaryStatus", 0] },
            "unpaid",
          ],
        },
      },
    },
  ]);

  return data;
};
