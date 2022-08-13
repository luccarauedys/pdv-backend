import * as expensesRepository from "../repositories/expensesRepository.js";
import { expenseSchema } from "../schemas/expenseSchema.js";

export async function createExpense(expenseData) {
  validateSchema(expenseSchema, expenseData);
  return await expensesRepository.insertOne(expenseData);
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
