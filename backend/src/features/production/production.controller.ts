import { Request, Response } from "express";
import { addProduct, getProduct, updatePrice } from "./production.service";

// add product
export const addProductController = async (req: Request, res: Response) => {
  try {
    const { num } = req.body;
    const result = await addProduct(Number(num));

    res.status(200).json({
      success: true,
      message: "Product added successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: err.message,
    });
  }
};

// get product
export const getProductController = async (req: Request, res: Response) => {
  try {
    const result = await getProduct();

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};


// Update price
export const updatePriceController = async (req: Request, res: Response) => {
  try {
    const { price } = req.body;
    const result = await updatePrice(Number(price));

    res.status(200).json({ success: true, message: "Price updated!", data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};