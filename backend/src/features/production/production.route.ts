import express from "express";
import { getProductByIdController, getProductController, updateProductController} from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch("/:id", updateProductController);

export default productRouter;
