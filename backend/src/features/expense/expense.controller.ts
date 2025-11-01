import { Request, Response } from "express";
import { getExpense } from "./expense.service"

//get top 10 expenses
export const getExpenseController = async(req:Request,res:Response)=>{
    try{
        const result = await getExpense();
        res.status(200).json({
            success:true,
            data: result,
            message:'Top 10 expenses'
        })
    }
    catch(err:any){
        console.log(err);
        res.status(400).json({
            success:false,
            message:'An error occured to fetching expenses',
            error: err
        })
        
    }
}