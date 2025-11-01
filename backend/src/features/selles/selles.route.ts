import express from "express";
import { sellProductController } from "./selles.controller";


const salesRouter = express.Router();

salesRouter.post("/", sellProductController);

export default salesRouter;
