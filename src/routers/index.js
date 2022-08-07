import express from 'express';

import companiesRouter from './companiesRouter.js';
import productsRouter from './productsRouter.js';
import salesRouter from './salesRouter.js';
import cashflowRouter from './cashflowRouter.js';

const router = express.Router();

router.use(companiesRouter);
router.use(productsRouter);
router.use(salesRouter);
router.use(cashflowRouter);

export default router;
