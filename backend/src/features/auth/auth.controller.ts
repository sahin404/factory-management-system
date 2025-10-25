import { Request, Response } from "express";
import { signUpServ } from "./auth.service";

export const signUp = async(req:Request, res:Response)=>{
    try{
        const data = req.body;
        const userData = await signUpServ(data);
        res.status(201).json({
            success:true,
            message: 'successfully create this account',
            data:userData
        })
    }
    catch(err:any){
        res.status(500).send({
            success:false, 
            message: err.message
        });
        console.log('Error occured into auth controller!!!!!', err);
    }
}