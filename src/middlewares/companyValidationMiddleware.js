import * as companiesRepository from '../repositories/companiesRepository.js';
import { notFoundError } from '../utils/errorUtils.js';

export async function checkIfCompanyExists(req, res, next) {
  const { companyId } = req.body;

  const company = await companiesRepository.findById(companyId);
  if (!company) throw notFoundError('Essa empresa não está cadastrada!');

  next();
}
