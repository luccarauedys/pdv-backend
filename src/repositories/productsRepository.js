import db from '../config/database.js';
import { mapObjectToUpdateQuery } from '../utils/sqlUtils.js';

export async function insertOne(productData) {
  const { name, quantity, costPrice, sellingPrice, companyId } = productData;

  return await db.query(
    'INSERT INTO products ("name", "quantity", "costPrice", "sellingPrice", "companyId") VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, quantity, costPrice, sellingPrice, companyId]
  );
}

export async function findByName(name, companyId) {
  const nameFilter = `${name}%`;

  const { rows } = await db.query(
    'SELECT * FROM products WHERE "name" ILIKE $1 AND "companyId" = $2',
    [nameFilter, companyId]
  );

  return rows;
}

export async function findById(id, companyId) {
  const result = await db.query('SELECT * FROM products WHERE "id" = $1 AND "companyId" = $2', [
    id,
    companyId,
  ]);
  return result.rows[0];
}

export async function findAll(companyId) {
  const result = await db.query('SELECT * FROM products WHERE "companyId" = $1', [companyId]);
  return result.rows;
}

export async function updateOne(productId, companyId, dataToUpdate) {
  const { objectColumns, objectValues } = mapObjectToUpdateQuery({
    object: dataToUpdate,
    offset: 3,
  });

  return await db.query(
    `
  UPDATE products
    SET ${objectColumns}
  WHERE "id" = $1 AND "companyId" = $2
  `,
    [productId, companyId, ...objectValues]
  );
}

export async function deleteOne(productId, companyId) {
  return await db.query('DELETE FROM products WHERE "id" = $1 AND "companyId" = $2', [
    productId,
    companyId,
  ]);
}
