import { Request, Response } from "express";
import { addExpense, getExpense } from "./expense.service";

//get top 10 expenses
export const getExpenseController = async (req: Request, res: Response) => {
  try {
    const result = await getExpense();
    res.status(200).json({
      success: true,
      data: result,
      message: "Top 10 expenses",
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occured to fetching expenses",
      error: err,
    });
  }
};

// add expense
export const addExpenseController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await addExpense(data);
    res.status(201).json({
      success: true,
      message: "Added Expense Successfully",
    });

  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occured to adding expenses",
      error: err,
    });
  }
};
