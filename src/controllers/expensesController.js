import * as expensesService from '../services/expensesService.js';

export async function createExpense(req, res) {
  const expenseData = req.body;
  await expensesService.createExpense(expenseData);
  res.sendStatus(201);
}

export async function getExpenses(req, res) {
  const { companyId } = req.body;
  const expenses = await expensesService.getExpenses(companyId);
  res.status(200).send(expenses);
}

export async function updateExpense(req, res) {
  const { companyId, dataToUpdate } = req.body;
  const { expenseId } = req.params;
  await expensesService.updateExpense(expenseId, companyId, dataToUpdate);
  res.sendStatus(200);
}

export async function deleteExpense(req, res) {
  const { companyId } = req.body;
  const { expenseId } = req.params;
  await expensesService.deleteExpense(expenseId, companyId);
  res.sendStatus(200);
}
