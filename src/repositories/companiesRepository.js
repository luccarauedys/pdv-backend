import db from "../config/database.js";

export async function insertOne({ name, email, encryptedPassword }) {
  return await db.query('INSERT INTO companies ("name", "email", "password") VALUES ($1, $2, $3)', [
    name,
    email,
    encryptedPassword,
  ]);
}

export async function findByEmail(email) {
  const result = await db.query("SELECT * FROM companies WHERE email = $1", [email]);
  return result.rows[0];
}

export async function findById(companyId) {
  const result = await db.query("SELECT id, name, email FROM companies WHERE companies.id = $1", [
    companyId,
  ]);
  return result.rows[0];
}
