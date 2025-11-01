import express from "express";
import { addProductController, getProductController } from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.post("/", addProductController);

export default productRouter;
