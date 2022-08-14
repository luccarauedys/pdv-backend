import db from "../config/database.js";

export async function insertOne({ companyId, products, totalPrice }) {
  return await db.query('INSERT INTO sales ("companyId", "products", "totalPrice") VALUES ($1, $2, $3)', [
    companyId,
    products, 
    totalPrice,
  ]);
}

export async function findAll(companyId) {
  const result = await db.query('SELECT * FROM sales WHERE sales."companyId" = $1', [companyId]);
  return result.rows;
}

export async function deleteOne(saleId, companyId) {
  return await db.query('DELETE FROM sales WHERE "id" = $1 AND "companyId" = $2', [
    saleId,
    companyId,
  ]);
}

export async function findById(saleId, companyId) {
  const result = await db.query('SELECT * FROM sales WHERE "id" = $1 AND "companyId" = $2', [
    saleId,
    companyId,
  ]);
  return result.rows[0];
}
