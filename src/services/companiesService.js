import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as companiesRepository from '../repositories/companiesRepository.js';
import { registerSchema, loginSchema } from '../schemas/companySchema.js';
import { validateSchema } from '../utils/schemaValidation.js';
import { conflictError, notFoundError, unauthorizedError } from '../utils/errorUtils.js';

export async function registerCompany(companyData) {
  const { name, email, password } = companyData;

  validateSchema(registerSchema, companyData);

  const company = await companiesRepository.findByEmail(email);
  if (company) throw conflictError('Essa empresa já está cadastrada!');

  const encryptedPassword = bcrypt.hashSync(password, 10);
  return await companiesRepository.insertOne({ name, email, encryptedPassword });
}

export async function login(companyData) {
  const { email, password } = companyData;

  validateSchema(loginSchema, companyData);

  const company = await companiesRepository.findByEmail(email);
  if (!company) throw notFoundError('Essa empresa não está cadastrada. Crie uma conta!');

  if (!bcrypt.compareSync(password, company.password))
    throw unauthorizedError('Credenciais inválidas!');

  const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  return token;
}
