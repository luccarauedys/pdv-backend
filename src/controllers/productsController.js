import * as productsService from "../services/productsService.js";

export async function createProduct(req, res) {
  const productData = req.body;
  const { companyId } = res.locals;

  await productsService.createProduct(productData, companyId);
  res.sendStatus(201);
}

export async function getProducts(req, res) {
  const { companyId } = res.locals;
  const { name } = req.query;

  const products = name
    ? await productsService.getProductsByName(name, companyId)
    : await productsService.getAllProducts(companyId);

  res.status(200).send(products);
}

export async function updateProduct(req, res) {
  const productData = req.body;
  const { companyId } = res.locals;

  await productsService.updateProduct(productData, companyId);
  res.sendStatus(200);
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;
  const { companyId } = res.locals;

  await productsService.deleteProduct(productId, companyId);
  res.sendStatus(200);
}
