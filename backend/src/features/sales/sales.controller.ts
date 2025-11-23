import { Request, Response } from "express";
import { addSales, getAllSales } from "./sales.service";

// get all sales
export const getAllSalesController = async (req: Request, res: Response) => {
  try {
    const response = await getAllSales();
    res.status(200).json({
      success: true,
      message: "Successfully fetched the data!",
      data: response,
    });
  } catch (err:any) {
    console.error("Error fetching sales:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch sales!",
    });
  }
};

// add sales
export const addSalesController = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      unit,
      totalPrice,
      buyerName,
      buyerMobileNumber,
      productName,
    } = req.body;

    // validation
    if (
      !productId ||
      !unit ||
      !totalPrice ||
      !buyerName ||
      !buyerMobileNumber ||
      !productName
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // call service
    const sale = await addSales({
      productId,
      unit,
      totalPrice,
      buyerName,
      buyerMobileNumber,
      productName,
    });

    return res.status(201).json({
      success: true,
      message: "Sale recorded successfully!",
      data: sale,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to record sale!",
    });
  }
};
