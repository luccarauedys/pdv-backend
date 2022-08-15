import * as expensesRepository from "../repositories/expensesRepository.js";
import { validateSchema } from "../utils/schemaValidation.js";
import { expenseSchema } from "../schemas/expenseSchema.js";

export async function createExpense(expenseData, companyId) {
  const expense = { ...expenseData, companyId };
  validateSchema(expenseSchema, { ...expenseData, companyId });
  return await expensesRepository.insertOne(expense);
}

export async function getExpenses(companyId) {
  return await expensesRepository.findAll(companyId);
}

export async function updateExpense(expenseId, companyId, expenseData) {
  await checkIfExpenseExists(expenseId, companyId);
  return await expensesRepository.updateOne(expenseId, companyId, expenseData);
}

export async function deleteExpense(expenseId, companyId) {
  await checkIfExpenseExists(expenseId, companyId);
  return await expensesRepository.deleteOne(expenseId, companyId);
}

const checkIfExpenseExists = async (expenseId, companyId) => {
  const expense = await expensesRepository.findById(expenseId, companyId);
  if (!expense) throw notFoundError("Ocorreu um erro... Despesa não encontrada!");
};
