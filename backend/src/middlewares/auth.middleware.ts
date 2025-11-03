import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../features/auth/auth.model";

dotenv.config();

interface JwtPayload{
    email:string;
    id:string;
}

export const verifyToken = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'] as string;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  //bearer token split
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY||"") as JwtPayload;
    
    //find full user detail from database
    const user = await User.findOne({email:decoded.email});

    (req as any).user = user;
    next();
  }
  
  catch(err:any){
        return res.status(403).json({ message: "Invalid or expired token" });   
  }
};
