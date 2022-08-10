import express from 'express';
import { checkIfCompanyExists } from '../middlewares/companyValidationMiddleware.js';
import { createSale, getSales, deleteSale } from '../controllers/salesController.js';

const salesRouter = express.Router();

salesRouter.use(checkIfCompanyExists);

salesRouter.post('/sales', createSale);
salesRouter.get('/sales', getSales);
salesRouter.delete('/sales/:id', deleteSale);

export default salesRouter;
