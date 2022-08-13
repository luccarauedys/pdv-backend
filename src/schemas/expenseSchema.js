import Joi from "joi";

export const expenseSchema = Joi.object({
  companyId: Joi.number().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
});
