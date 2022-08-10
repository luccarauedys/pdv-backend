import * as productsService from '../services/productsService.js';

export async function createProduct(req, res) {
  const productData = req.body;
  await productsService.createProduct(productData);
  res.sendStatus(201);
}

export async function getProducts(req, res) {
  const { name, companyId } = req.body;

  console.log(name);

  let products = [];

  if (name) {
    products = await productsService.getProductsByName(name, companyId);
  } else {
    products = await productsService.getAllProducts(companyId);
  }

  res.status(200).send(products);
}

export async function updateProduct(req, res) {}

export async function deleteProduct(req, res) {}
