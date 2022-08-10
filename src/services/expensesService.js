import * as expensesRepository from '../repositories/expensesRepository.js';
import { expenseSchema } from '../schemas/expenseSchema.js';

export async function createExpense(expenseData) {
  validateSchema(expenseSchema, expenseData);
  return await expensesRepository.insertOne(expenseData);
}

export async function getExpenses(companyId) {
  return await expensesRepository.findAll(companyId);
}

export async function updateExpense(expenseId, companyId, dataToUpdate) {
  const expense = await expensesRepository.findById(expenseId, companyId);
  if (!expense) throw notFoundError('Não foi possível editar. Despesa não encontrada!');

  return await expensesRepository.updateOne(expenseId, companyId, dataToUpdate);
}

export async function deleteExpense(expenseId, companyId) {
  const expense = await expensesRepository.findById(expenseId, companyId);
  if (!expense) throw notFoundError('Não foi possível deletar. Despesa não encontrada!');

  return await expensesRepository.deleteOne(expenseId, companyId);
}
