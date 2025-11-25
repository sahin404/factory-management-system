import { Request, Response } from "express";
import { getPresentEmployees, getTotalEmployees } from "./overview.service";

// get total employees
export const getTotalEmployeesController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getTotalEmployees();
    res.status(200).json({
      success: true,
      message: "Success",
      data: response,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// get total present employees
export const getPresentEmployeesController = async(req:Request, res:Response)=>{
    try {
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }
    const employees = await getPresentEmployees(date);

    return res.status(200).json({
      success: true,
      data: employees.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
}