import express from 'express';

import companiesRouter from './companiesRouter.js';
import productsRouter from './productsRouter.js';
import salesRouter from './salesRouter.js';
import expensesRouter from './expensesRouter.js';

const router = express.Router();

router.use(companiesRouter);
router.use(productsRouter);
router.use(salesRouter);
router.use(expensesRouter);

export default router;
