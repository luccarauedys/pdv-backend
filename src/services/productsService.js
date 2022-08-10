import * as productsRepository from '../repositories/productsRepository.js';
import * as companiesRepository from '../repositories/companiesRepository.js';
import { productSchema } from '../schemas/productSchema.js';
import { validateSchema } from '../utils/schemaValidation.js';
import { conflictError, notFoundError } from '../utils/errorUtils.js';

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

export async function updateProduct(productId, companyId, dataToUpdate) {
  await checkIfCompanyExists(companyId);

  const product = await productsRepository.findById(productId, companyId);
  if (!product) throw notFoundError('Produto não encontrado!');

  return await productsRepository.updateOne(productId, companyId, dataToUpdate);
}

export async function deleteProduct(productId, companyId) {
  await checkIfCompanyExists(companyId);

  const product = await productsRepository.findById(productId, companyId);
  if (!product) throw notFoundError('Produto não encontrado!');

  return await productsRepository.deleteOne(productId, companyId);
}

async function checkIfCompanyExists(companyId) {
  const company = await companiesRepository.findById(companyId);
  if (!company) throw notFoundError('Essa empresa não está cadastrada!');
  return company;
}

async function checkIfProductAlreadyExists(name, companyId) {
  const product = await productsRepository.findByName(name, companyId);
  if (product[0]) throw conflictError('Esse produto já está cadastrado!');
}
