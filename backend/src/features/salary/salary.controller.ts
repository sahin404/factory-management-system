import { Request, Response } from "express"
import { addSalaryInformation } from "./salary.service";


// added salary information
export const addSalaryController = async (req: Request, res: Response) => {
  try {
    const { empId, salaryStatus, month } = req.body;

    // validation
    if (!empId || !salaryStatus || !month) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // save or update salary info
    const data = await addSalaryInformation(empId, salaryStatus, month);

    return res.status(200).json({ success: true, message: "Salary information saved", data });
  } catch (err: any) {
    console.error("Error in addSalaryController:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};