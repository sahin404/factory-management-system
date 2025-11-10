import express from "express";
import { deleteProductByIdController, getProductByIdController, getProductController, updateAllFieldsController, updateProductQuantityController} from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch("/:id", updateProductQuantityController);
productRouter.put("/:id", updateAllFieldsController);
productRouter.delete("/:id", deleteProductByIdController);

export default productRouter;
