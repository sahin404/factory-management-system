import express from "express";
import { getProductByIdController, getProductController} from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.get("/:id", getProductByIdController);

export default productRouter;
