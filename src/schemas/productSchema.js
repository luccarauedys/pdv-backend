import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  costPrice: Joi.number().required(),
  sellingPrice: Joi.number().required(),
  companyId: Joi.number().required(),
});
