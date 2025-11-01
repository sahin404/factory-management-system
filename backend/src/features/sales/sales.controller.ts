import { Request, Response } from "express";
import { saleProduct } from "./sales.service";

// Sell product
export const saleProductController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const result = await saleProduct({ quantity: Number(quantity) });

    res.status(200).json({
      success: true,
      message: "Sale completed successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to complete sale",
      error: err,
    });
  }
};
