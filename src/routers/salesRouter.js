import express from "express";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";
import { checkIfCompanyExists } from "../middlewares/companyValidationMiddleware.js";
import { createSale, getSales, deleteSale } from "../controllers/salesController.js";

const salesRouter = express.Router();

salesRouter.use(verifyJWT);
salesRouter.use(checkIfCompanyExists);

salesRouter.post("/sales", createSale);
salesRouter.get("/sales", getSales);
salesRouter.delete("/sales/:saleId", deleteSale);

export default salesRouter;
