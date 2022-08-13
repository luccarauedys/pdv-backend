import express from "express";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";
import { checkIfCompanyExists } from "../middlewares/companyValidationMiddleware.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.use(verifyJWT);
productsRouter.use(checkIfCompanyExists);

productsRouter.post("/products", createProduct);
productsRouter.get("/products", getProducts);
productsRouter.put("/products/:productId", updateProduct);
productsRouter.delete("/products/:productId", deleteProduct);

export default productsRouter;
