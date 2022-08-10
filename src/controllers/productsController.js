import * as productsService from '../services/productsService.js';

export async function createProduct(req, res) {
  const productData = req.body;
  await productsService.createProduct(productData);
  res.sendStatus(201);
}

export async function getProducts(req, res) {
  const { name, companyId } = req.body;

  let products = [];
  if (name) {
    products = await productsService.getProductsByName(name, companyId);
  } else {
    products = await productsService.getAllProducts(companyId);
  }

  res.status(200).send(products);
}

export async function updateProduct(req, res) {
  const { companyId, dataToUpdate } = req.body;
  const { id: productId } = req.params;
  await productsService.updateProduct(productId, companyId, dataToUpdate);
  res.sendStatus(200);
}

export async function deleteProduct(req, res) {
  const { companyId } = req.body;
  const { id: productId } = req.params;
  await productsService.deleteProduct(productId, companyId);
  res.sendStatus(200);
}
