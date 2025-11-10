import express from "express";
import { getProductByIdController, getProductController, updateAllFieldsController, updateProductQuantityController} from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch("/:id", updateProductQuantityController);
productRouter.put("/:id", updateAllFieldsController);

export default productRouter;
