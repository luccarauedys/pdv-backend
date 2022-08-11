import db from '../config/database.js';

export async function insertOne({ name, email, encryptedPassword }) {
  return await db.query(
    'INSERT INTO companies ("name", "email", "password") VALUES ($1, $2, $3) RETURNING id',
    [name, email, encryptedPassword]
  );
}

export async function findByEmail(email) {
  const result = await db.query('SELECT * FROM companies WHERE email = $1', [email]);
  return result.rows[0];
}

export async function findById(companyId) {
  const result = await db.query('SELECT * FROM companies WHERE id = $1', [companyId]);
  return result.rows[0];
}

export async function findCompanyData(companyId) {
  const { rows: companyData } = await db.query(
    'SELECT id, name FROM companies WHERE companies.id = $1',
    [companyId]
  );

  const { rows: products } = await db.query(
    'SELECT id, name, quantity, "costPrice", "sellingPrice" FROM products WHERE products."companyId" = $1',
    [companyId]
  );

  const { rows: sales } = await db.query(
    'SELECT sales.id, products.name as "product", sales.quantity, sales."totalPrice", sales.date FROM sales JOIN products ON sales."productId" = products.id WHERE sales."companyId" = $1',
    [companyId]
  );

  const { rows: expenses } = await db.query(
    'SELECT expenses.id, expenses.description, expenses."totalPrice", expenses.date FROM expenses WHERE expenses."companyId" = $1',
    [companyId]
  );

  return { company: companyData[0], products, sales, expenses };
}
