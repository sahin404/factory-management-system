import express from "express";
import { addSalaryController } from "./salary.controller";

const salaryRouter = express.Router();

salaryRouter.post("/", addSalaryController);


export default salaryRouter;
