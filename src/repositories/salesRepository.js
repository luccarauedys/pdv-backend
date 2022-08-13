import db from "../config/database.js";

export async function insertOne({ companyId, productId, quantity, totalPrice }) {
  return await db.query(
    'INSERT INTO sales ("companyId", "productId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4)',
    [companyId, productId, quantity, totalPrice]
  );
}

export async function findById(saleId, companyId) {
  const result = await db.query('SELECT * FROM sales WHERE "id" = $1 AND "companyId" = $2', [
    saleId,
    companyId,
  ]);
  return result.rows[0];
}

export async function findAll(companyId) {
  const result = await db.query(
    `
  SELECT sales.id, products.name as "product", sales.quantity, sales."totalPrice", sales.date 
  FROM sales 
  JOIN products ON sales."productId" = products.id 
  WHERE sales."companyId" = $1
  `,
    [companyId]
  );
  return result.rows;
}

export async function deleteOne(saleId, companyId) {
  return await db.query('DELETE FROM sales WHERE "id" = $1 AND "companyId" = $2', [
    saleId,
    companyId,
  ]);
}
