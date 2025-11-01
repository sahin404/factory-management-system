import express from "express";
import { addProductController, getProductController, updatePriceController } from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.post("/", addProductController);
productRouter.put("/price", updatePriceController);

export default productRouter;
