import db from "../config/database.js";

export async function insertOne(productData, companyId) {
  const { name, stock, costPrice, sellingPrice } = productData;

  return await db.query(
    'INSERT INTO products ("name", "stock", "costPrice", "sellingPrice", "companyId") VALUES ($1, $2, $3, $4, $5)',
    [name, stock, costPrice, sellingPrice, companyId]
  );
}

export async function findByName(name, companyId) {
  const nameFilter = `${name}%`;

  const result = await db.query(
    'SELECT * FROM products WHERE "name" ILIKE $1 AND "companyId" = $2',
    [nameFilter, companyId]
  );

  return result.rows;
}

export async function findById(productId, companyId) {
  const result = await db.query('SELECT * FROM products WHERE "id" = $1 AND "companyId" = $2', [
    productId,
    companyId,
  ]);

  return result.rows[0];
}

export async function findAll(companyId) {
  const result = await db.query(
    'SELECT * FROM products WHERE products."companyId" = $1 ORDER BY "name" ASC',
    [companyId]
  );
  return result.rows;
}

export async function updateOne(productData, companyId) {
  const { id, name, stock, costPrice, sellingPrice } = productData;

  return await db.query(
    `
  UPDATE products 
  SET "name" = $1, "stock" = $2, "costPrice" = $3, "sellingPrice" = $4 
  WHERE "id" = $5 AND "companyId" = $6
  `,
    [name, stock, costPrice, sellingPrice, id, companyId]
  );
}

export async function deleteOne(productId, companyId) {
  return await db.query('DELETE FROM products WHERE "id" = $1 AND "companyId" = $2', [
    productId,
    companyId,
  ]);
}
