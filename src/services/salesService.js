import * as salesRepository from '../repositories/salesRepository.js';
import * as productsRepository from '../repositories/productsRepository.js';
import { validateSchema } from '../utils/schemaValidation.js';
import { saleSchema } from '../schemas/saleSchema.js';
import { notFoundError } from '../utils/errorUtils.js';

export async function createSale(saleData) {
  validateSchema(saleSchema, saleData);

  const { companyId, productId } = saleData;
  const product = await productsRepository.findById(productId, companyId);
  if (!product) throw notFoundError('Produto não encontrado!');

  return await salesRepository.insertOne(saleData);
}

export async function getSales(companyId) {
  return await salesRepository.findAll(companyId);
}

export async function deleteSale(saleId, companyId) {
  const sale = await salesRepository.findById(saleId, companyId);
  if (!sale) throw notFoundError('Venda não encontrada!');

  return await salesRepository.deleteOne(saleId, companyId);
}
