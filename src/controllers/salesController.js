import * as salesService from "../services/salesService.js";

export async function createSale(req, res) {
  const saleData = req.body;
  await salesService.createSale(saleData);
  res.sendStatus(201);
}

export async function getSales(_req, res) {
  const { companyId } = res.locals;
  const sales = await salesService.getSales(companyId);
  res.status(200).send(sales);
}

export async function deleteSale(req, res) {
  const { saleId } = req.params;
  const { companyId } = res.locals;
  await salesService.deleteSale(saleId, companyId);
  res.sendStatus(200);
}
