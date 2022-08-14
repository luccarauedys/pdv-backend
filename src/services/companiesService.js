import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as companiesRepository from "../repositories/companiesRepository.js";
import { signUpSchema, signInSchema } from "../schemas/companySchema.js";
import { validateSchema } from "../utils/schemaValidation.js";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils.js";

export async function signUp(companyData) {
  const { name, email, password } = companyData;

  validateSchema(signUpSchema, companyData);

  await checkIfCompanyIsRegistered(email, "signup");

  const encryptedPassword = bcrypt.hashSync(password, 10);

  return await companiesRepository.insertOne({ name, email, encryptedPassword });
}

export async function signIn(companyData) {
  const { email, password } = companyData;

  validateSchema(signInSchema, companyData);

  const company = await checkIfCompanyIsRegistered(email, "signin");

  if (!bcrypt.compareSync(password, company.password))
    throw unauthorizedError("Credenciais inválidas!");

  const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET_KEY);

  return token;
}

export async function getCompanyData(companyId) {
  return await companiesRepository.findById(companyId);
}

export const checkIfCompanyIsRegistered = async (email, action) => {
  const company = await companiesRepository.findByEmail(email);

  if (action === "signup" && company) throw conflictError("Essa empresa já está cadastrada!");
  if (action === "signin" && !company) throw notFoundError("Essa empresa não está cadastrada!");

  if (company) return company;
};
