import express from 'express';
import { checkIfCompanyExists } from '../middlewares/companyValidationMiddleware.js';
import { verifyJWT } from '../middlewares/tokenMiddleware.js';
import { registerCompany, login, getAllCompanyData } from '../controllers/companiesController.js';

const companiesRouter = express.Router();

companiesRouter.post('/companies/register', registerCompany);
companiesRouter.post('/companies/login', login);
companiesRouter.get('/companies', verifyJWT, checkIfCompanyExists, getAllCompanyData);

export default companiesRouter;
