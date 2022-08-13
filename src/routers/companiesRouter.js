import express from "express";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";
import { checkIfCompanyExists } from "../middlewares/companyValidationMiddleware.js";
import { signUp, signIn, getCompanyData } from "../controllers/companiesController.js";

const companiesRouter = express.Router();

companiesRouter.post("/companies/signup", signUp);
companiesRouter.post("/companies/signin", signIn);
companiesRouter.get("/companies", verifyJWT, checkIfCompanyExists, getCompanyData);

export default companiesRouter;
