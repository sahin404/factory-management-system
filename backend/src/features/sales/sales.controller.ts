import { Request, Response } from "express";
import { addSales } from "./sales.service";


// add sales
export const addSalesController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const salesNum = Number(req.body.salesNum);
    const response = await addSales(id, salesNum);
    return res.status(201).json({
      success: true,
      message: "Sale recorded successfully!",
      data: response,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to record sale!",
    });
  }
};
