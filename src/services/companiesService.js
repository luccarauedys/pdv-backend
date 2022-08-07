import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as companiesRepository from '../repositories/companiesRepository.js';
import { registerSchema, loginSchema } from '../schemas/companySchema.js';
import {
  wrongSchemaError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from '../utils/errorUtils.js';

export async function registerCompany(companyData) {
  const { name, email, password } = companyData;

  const { error } = registerSchema.validate(companyData, { abortEarly: false });
  if (error) {
    const messagesArr = error.details.map((detail) => detail.message);
    const messagesStr = messagesArr.join(', ');
    throw wrongSchemaError(messagesStr);
  }

  const company = await companiesRepository.findByEmail(email);
  if (company) throw conflictError('This company is already registered!');

  const encryptedPassword = bcrypt.hashSync(password, 10);
  return await companiesRepository.insertOne({ name, email, encryptedPassword });
}

export async function login(companyData) {
  const { email, password } = companyData;

  const { error } = loginSchema.validate(companyData, { abortEarly: false });
  if (error) {
    const messagesArr = error.details.map((detail) => detail.message);
    const messagesStr = messagesArr.join(', ');
    throw wrongSchemaError(messagesStr);
  }

  const company = await companiesRepository.findByEmail(email);

  if (!company) throw notFoundError('Company does not exist. Create a new account!');

  if (!bcrypt.compareSync(password, company.password))
    throw unauthorizedError('Invalid credentials!');

  const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  return token;
}
