import express from "express";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";
import { checkIfCompanyExists } from "../middlewares/companyValidationMiddleware.js";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expensesController.js";

const expensesRouter = express.Router();

expensesRouter.use(verifyJWT);
expensesRouter.use(checkIfCompanyExists);

expensesRouter.post("/expenses", createExpense);
expensesRouter.get("/expenses", getExpenses);
expensesRouter.put("/expenses/:expenseId", updateExpense);
expensesRouter.delete("/expenses/:expenseId", deleteExpense);

export default expensesRouter;
