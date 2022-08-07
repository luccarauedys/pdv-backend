import express from 'express';
import { registerCompany, login } from '../controllers/companiesController.js';

const companiesRouter = express.Router();

companiesRouter.post('/companies/register', registerCompany);
companiesRouter.post('/companies/login', login);

export default companiesRouter;
