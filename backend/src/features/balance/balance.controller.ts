import { Request, Response } from "express"
import { balance } from "./balance.service";

export const balanceController = async(req:Request,res:Response) =>{
    try{
        const response = await balance();
        res.status(200).json({
            success:true,
            data:response.balance
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"Error occured to fetching main balance!",
        })
        console.log("Error occured to fetching main balance!!!!!", err);
    }
}