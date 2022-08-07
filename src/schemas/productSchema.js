import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  costPrice: Joi.number().required(),
  sellingPrice: Joi.number().required(),
  companyId: Joi.number().required(),
});
