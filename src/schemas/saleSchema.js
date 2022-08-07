import Joi from 'joi';

export const saleSchema = Joi.object({
  companyId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  totalPrice: Joi.number().required(),
});
