import express from "express";
import { getProductController} from "./production.controller";

const productRouter = express.Router();

productRouter.get("/", getProductController);

export default productRouter;
