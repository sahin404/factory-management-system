import express from "express";
import { addSalaryController, getSalaryByMonthController } from "./salary.controller";

const salaryRouter = express.Router();

salaryRouter.post("/", addSalaryController);
salaryRouter.get("/:month", getSalaryByMonthController);


export default salaryRouter;
