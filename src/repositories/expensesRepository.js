import db from '../config/database.js';

export async function insertOne(expenseData) {
  const { companyId, description, totalPrice } = expenseData;
  return await db.query(
    'INSERT INTO expenses ("companyId", "description", "totalPrice") VALUES ($1, $2, $3) RETURNING id',
    [companyId, description, totalPrice]
  );
}

export async function findAll(companyId) {
  const result = await db.query('SELECT * FROM expenses WHERE "companyId" = $1', [companyId]);
  return result.rows;
}

export async function updateOne(expenseId, companyId, dataToUpdate) {
  const { objectColumns, objectValues } = mapObjectToUpdateQuery({
    object: dataToUpdate,
    offset: 3,
  });

  return await db.query(
    `UPDATE expenses SET ${objectColumns} WHERE "id" = $1 AND "companyId" = $2`,
    [expenseId, companyId, ...objectValues]
  );
}

export async function deleteOne(expenseId, companyId) {
  return await db.query('DELETE FROM expenses WHERE "id" = $1 AND "companyId" = $2', [
    expenseId,
    companyId,
  ]);
}

export async function findById(expenseId, companyId) {
  const result = await db.query('SELECT * FROM expenses WHERE "id" = $1 AND "companyId" = $2', [
    expenseId,
    companyId,
  ]);
  return result.rows[0];
}
