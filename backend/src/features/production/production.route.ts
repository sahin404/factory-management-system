import express from "express";
import { addProductController, deleteProductByIdController, getProductByIdController, getProductController, updateAllFieldsController, updateProductQuantityController} from "./production.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/adminVerify.middlware";
import { verifyManager } from "../../middlewares/managerVerify.middleware";

const productRouter = express.Router();

productRouter.get("/", verifyToken, verifyAdmin, verifyManager, getProductController);
productRouter.get("/:id", verifyToken, verifyAdmin, verifyManager, getProductByIdController);
productRouter.patch("/:id", verifyToken, verifyAdmin, verifyManager, updateProductQuantityController);
productRouter.put("/:id", verifyToken, verifyAdmin, verifyManager, updateAllFieldsController);
productRouter.delete("/:id", verifyToken, verifyAdmin, verifyManager, deleteProductByIdController);
productRouter.post("/", verifyToken, verifyAdmin, verifyManager, addProductController);

export default productRouter;
