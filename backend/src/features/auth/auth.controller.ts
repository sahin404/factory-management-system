import { Request, Response } from "express";
import { signUpServ, loginServ } from "./auth.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userData = await signUpServ(data);
    res.status(201).json({
      success: true,
      message: "successfully create this account",
      data: userData,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
    console.log("Error occured into auth controller!!!!!", err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginServ({ email, password });
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: response,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
