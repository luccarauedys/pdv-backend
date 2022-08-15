import db from "../config/database.js";

export async function insertOne({ companyId, description, value, date }) {
  return await db.query(
    'INSERT INTO expenses ("companyId", "description", "value", "date") VALUES ($1, $2, $3, $4)',
    [companyId, description, value, date]
  );
}

export async function findById(expenseId, companyId) {
  const result = await db.query('SELECT * FROM expenses WHERE "id" = $1 AND "companyId" = $2', [
    expenseId,
    companyId,
  ]);

  return result.rows[0];
}

export async function findAll(companyId) {
  const result = await db.query('SELECT * FROM expenses WHERE expenses."companyId" = $1', [
    companyId,
  ]);

  return result.rows;
}

export async function updateOne(expenseId, companyId, expenseData) {
  const { description, value, date } = expenseData;

  return await db.query(
    'UPDATE expenses SET "description" = $1, "value" = $2, "date" = $3 WHERE id = $4 AND "companyId" = $5',
    [description, value, date, expenseId, companyId]
  );
}

export async function deleteOne(expenseId, companyId) {
  return await db.query('DELETE FROM expenses WHERE "id" = $1 AND "companyId" = $2', [
    expenseId,
    companyId,
  ]);
}
