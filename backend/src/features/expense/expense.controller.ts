import { Request, Response } from "express";
import { addExpense, deleteExpense, getExpense, updateExpense } from "./expense.service";

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

// update expense
export const updateExpenseController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    data.amount = Number(data.amount);
    const result = await updateExpense({id, ...data});
    res.status(200).json({
        success:true,
        data: result,
        message:'Update Amount Successfully!',
    })
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occured to update expenses",
      error: err,
    });
  }
};


//delete expense
export const deleteExpenseController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await deleteExpense(id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error("Error deleting expense:", err.message || err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting expense",
      error: err.message || err,
    });
  }
};