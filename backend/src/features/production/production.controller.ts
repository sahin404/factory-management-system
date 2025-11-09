import { Request, Response } from "express";
import { getProduct, getProductById } from "./production.service";

// get product
export const getProductController = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;
    const pagination = parseInt(req.query.page as string) || 1;

    const result = await getProduct(searchQuery, pagination);

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

//get a product by id
export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const response = await getProductById(productId);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error in fetching single product.'
    });
    console.log(err);
  }
};
