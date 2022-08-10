import * as productsRepository from '../repositories/productsRepository.js';
import { productSchema } from '../schemas/productSchema.js';
import { validateSchema } from '../utils/schemaValidation.js';
import { conflictError, notFoundError } from '../utils/errorUtils.js';

export async function createProduct(productData) {
  validateSchema(productSchema, productData);

  const { name, companyId } = productData;
  await checkIfProductAlreadyExists(name, companyId);

  return await productsRepository.insertOne(productData);
}

export async function getAllProducts(companyId) {
  return await productsRepository.findAll(companyId);
}

export async function getProductsByName(name, companyId) {
  return await productsRepository.findByName(name, companyId);
}

export async function updateProduct(productId, companyId, dataToUpdate) {
  const product = await productsRepository.findById(productId, companyId);
  if (!product) throw notFoundError('Não foi possível editar. Produto não encontrado!');

  return await productsRepository.updateOne(productId, companyId, dataToUpdate);
}

export async function deleteProduct(productId, companyId) {
  const product = await productsRepository.findById(productId, companyId);
  if (!product) throw notFoundError('Não foi possível deletar. Produto não encontrado!');

  return await productsRepository.deleteOne(productId, companyId);
}

async function checkIfProductAlreadyExists(name, companyId) {
  const product = await productsRepository.findByName(name, companyId);
  if (product[0]) throw conflictError('Esse produto já está cadastrado!');
}
