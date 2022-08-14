import Joi from "joi";

export const saleSchema = Joi.object({
  id: Joi.number().optional(),
  companyId: Joi.number().required(),
  products: Joi.string().required(),
  totalPrice: Joi.number().required(),
  date: Joi.date().iso().optional(),
});
