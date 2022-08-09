import * as productsRepository from '../repositories/productsRepository.js';
import { productSchema } from '../schemas/productSchema.js';
import { validateSchema } from '../utils/schemaValidation.js';
import {
  wrongSchemaError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from '../utils/errorUtils.js';

export async function createProduct(productData) {
  validateSchema(productSchema, productData);

  const { name, companyId } = productData;
  const product = await productsRepository.findByName(name, companyId);
  if (product[0]) throw conflictError('Esse produto já está cadastrado!');

  return await productsRepository.insertOne(productData);
}

export async function getProducts() {}

export async function getProduct() {}

export async function updateProduct() {}

export async function deleteProduct() {}
