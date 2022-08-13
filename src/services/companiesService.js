import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as companiesRepository from "../repositories/companiesRepository.js";
import * as productsRepository from "../repositories/productsRepository.js";
import * as salesRepository from "../repositories/salesRepository.js";
import * as expensesRepository from "../repositories/expensesRepository.js";
import { signUpSchema, signInSchema } from "../schemas/companySchema.js";
import { validateSchema } from "../utils/schemaValidation.js";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils.js";

export async function signUp(companyData) {
  const { name, email, password } = companyData;

  validateSchema(signUpSchema, companyData);
  checkIfCompanyIsRegistered(email, "signup");

  const encryptedPassword = bcrypt.hashSync(password, 10);
  return await companiesRepository.insertOne({ name, email, encryptedPassword });
}

export async function signIn(companyData) {
  const { email, password } = companyData;

  validateSchema(signInSchema, companyData);
  checkIfCompanyIsRegistered(email, "signin");

  if (!bcrypt.compareSync(password, company.password))
    throw unauthorizedError("Credenciais inválidas!");

  const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
}

export async function getCompanyData(companyId) {
  const company = await companiesRepository.findById(companyId);
  const products = await productsRepository.findAll(companyId);
  const sales = await salesRepository.findAll(companyId);
  const expenses = await expensesRepository.findAll(companyId);
  return { company, products, sales, expenses };
}

export const checkIfCompanyIsRegistered = async (email, action) => {
  const company = await companiesRepository.findByEmail(email);

  if (action === "sign up" && company) throw conflictError("Essa empresa já está cadastrada!");
  if (action === "sign in" && !company) throw notFoundError("Essa empresa não está cadastrada!");
};
