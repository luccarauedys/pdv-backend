import * as expensesService from "../services/expensesService.js";

export async function createExpense(req, res) {
  const expenseData = req.body;
  const { companyId } = res.locals;

  await expensesService.createExpense(expenseData, companyId);
  res.sendStatus(201);
}

export async function getExpenses(_req, res) {
  const { companyId } = res.locals;
  const expenses = await expensesService.getExpenses(companyId);
  res.status(200).send(expenses);
}

export async function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { companyId } = res.locals;
  const { expenseData } = req.body;

  await expensesService.updateExpense(expenseId, companyId, expenseData);
  res.sendStatus(200);
}

export async function deleteExpense(req, res) {
  const { expenseId } = req.params;
  const { companyId } = res.locals;

  await expensesService.deleteExpense(expenseId, companyId);
  res.sendStatus(200);
}
