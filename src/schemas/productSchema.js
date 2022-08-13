import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  stock: Joi.number().required(),
  costPrice: Joi.number().required(),
  sellingPrice: Joi.number().required(),
  companyId: Joi.number().required(),
});
