import express from "express";
import { saleProductController } from "./sales.controller";


const salesRouter = express.Router();

salesRouter.post("/", saleProductController);

export default salesRouter;
