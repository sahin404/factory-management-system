import express from "express";
import { addSalaryController, getSalaryController } from "./salary.controller";

const salaryRouter = express.Router();

salaryRouter.post("/", addSalaryController);
salaryRouter.get("/", getSalaryController);


export default salaryRouter;
