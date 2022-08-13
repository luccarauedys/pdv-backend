import * as productsRepository from "../repositories/productsRepository.js";
import { productSchema } from "../schemas/productSchema.js";
import { validateSchema } from "../utils/schemaValidation.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";

export async function createProduct(productData) {
  validateSchema(productSchema, productData);

  const { name, companyId } = productData;
  await checkIfProductExists({ name, companyId, action: "create" });

  return await productsRepository.insertOne(productData);
}

export async function getAllProducts(companyId) {
  return await productsRepository.findAll(companyId);
}

export async function getProductsByName(name, companyId) {
  return await productsRepository.findByName(name, companyId);
}

export async function updateProduct(productData) {
  const { id: productId, companyId } = productData;
  await checkIfProductExists({ productId, companyId, action: "update" });

  return await productsRepository.updateOne(productData);
}

export async function deleteProduct(productId, companyId) {
  await checkIfProductExists({ productId, companyId, action: "delete" });

  return await productsRepository.deleteOne(productId, companyId);
}

async function checkIfProductExists(params) {
  const { name, productId, companyId, action } = params;

  if (action === "create") {
    const [product] = await productsRepository.findByName(name, companyId);
    if (product) throw conflictError("Esse produto já está cadastrado!");
  }

  if (action === "update" || action === "delete") {
    const product = await productsRepository.findById(productId, companyId);
    if (!product) throw notFoundError("Ocorreu um erro... Produto não encontrado!");
  }
}
