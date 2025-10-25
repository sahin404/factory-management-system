import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export const dbConncet= async()=>{
    try{
        await mongoose.connect(process.env.DB||"");
        console.log('Database connected successfully!');
    }
    catch{
        console.log('Database connection is not successfull!');
    }
}