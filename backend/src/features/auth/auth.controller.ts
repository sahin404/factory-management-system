import { Request, Response } from "express";
import { signUpServ, loginServ } from "./auth.service";
import { singupValidation } from "./aut.validation";

// signup
export const signUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    //validation
    const validate = singupValidation.safeParse(data);
    if(!validate.success){
        return res.status(400).json({
            success:false,
            message: validate.error.issues[0].message,
        })
    }

    // call for function
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

// login
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


// find logged in user
export const checkAuth = async(req:Request, res:Response)=>{
  try{
    console.log("hello");
    res.status(200).json({
      success:true,
      data: (req as any).user
    })
  }
  catch(err:any){
    res.status(400).json({
      success:false,
      message:"No logged in user found!"
    })
    console.log("No logged in user found!", err);
  }
}