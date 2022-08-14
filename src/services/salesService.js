import * as salesRepository from "../repositories/salesRepository.js";
import { validateSchema } from "../utils/schemaValidation.js";
import { saleSchema } from "../schemas/saleSchema.js";
import { notFoundError } from "../utils/errorUtils.js";

export async function createSale(saleData) {
  validateSchema(saleSchema, saleData);
  return await salesRepository.insertOne(saleData);
}

export async function getSales(companyId) {
  return await salesRepository.findAll(companyId);
}

export async function deleteSale(saleId, companyId) {
  await checkIfSaleExists(saleId, companyId);
  return await salesRepository.deleteOne(saleId, companyId);
}

const checkIfSaleExists = async (saleId, companyId) => {
  const sale = await salesRepository.findById(saleId, companyId);
  if (!sale) throw notFoundError("Ocorreu um erro... Venda não encontrada!");
};
