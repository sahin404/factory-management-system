import { Request, Response } from "express";
import { getProduct} from "./production.service";


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
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};
