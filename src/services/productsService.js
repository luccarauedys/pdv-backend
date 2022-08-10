import * as productsRepository from '../repositories/productsRepository.js';
import * as companiesRepository from '../repositories/companiesRepository.js';
import { productSchema } from '../schemas/productSchema.js';
import { validateSchema } from '../utils/schemaValidation.js';
import {
  wrongSchemaError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from '../utils/errorUtils.js';

export async function createProduct(productData) {
  const { name, companyId } = productData;

  validateSchema(productSchema, productData);
  await checkIfCompanyExists(companyId);
  await checkIfProductAlreadyExists(name, companyId);

  return await productsRepository.insertOne(productData);
}

export async function getAllProducts(companyId) {
  await checkIfCompanyExists(companyId);
  return await productsRepository.findAll(companyId);
}

export async function getProductsByName(name, companyId) {
  await checkIfCompanyExists(companyId);
  return await productsRepository.findByName(name, companyId);
}

export async function updateProduct() {}

export async function deleteProduct() {}

async function checkIfCompanyExists(companyId) {
  const company = await companiesRepository.findById(companyId);
  if (!company) throw notFoundError('Essa empresa não está cadastrada!');
  return company;
}

async function checkIfProductAlreadyExists(name, companyId) {
  const product = await productsRepository.findByName(name, companyId);
  if (product[0]) throw conflictError('Esse produto já está cadastrado!');
}
