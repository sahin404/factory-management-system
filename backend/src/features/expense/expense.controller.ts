import { Request, Response } from "express";
import { getExpense } from "./expense.service";

//Get top 5 Expense
export const getExpenseController = async (req: Request, res: Response) => {
  try {
    const result = await getExpense();

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No expenses found yet",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error fetching expenses:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching expenses",
    });
  }
};
