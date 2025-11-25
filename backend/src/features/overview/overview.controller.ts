import { Request, Response } from "express";
import { getTotalEmployees } from "./overview.service";


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
