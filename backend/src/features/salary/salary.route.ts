import express from "express";
import { addSalaryController, getSalaryController } from "./salary.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/adminVerify.middlware";
import { verifyAccountant } from "../../middlewares/accountantVerify.middleware";

const salaryRouter = express.Router();

salaryRouter.post("/", verifyToken, verifyAdmin, verifyAccountant, addSalaryController);
salaryRouter.get("/",  verifyToken, verifyAdmin, verifyAccountant, getSalaryController);


export default salaryRouter;
