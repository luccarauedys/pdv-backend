import * as productsService from '../services/productsService.js';

export async function createProduct(req, res) {
  const productData = req.body;
  await productsService.createProduct(productData);
  res.sendStatus(201);
}

export async function getAllProducts(req, res) {}

export async function getProduct(req, res) {}

export async function updateProduct(req, res) {}

export async function deleteProduct(req, res) {}
