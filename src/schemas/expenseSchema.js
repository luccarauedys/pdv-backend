import Joi from "joi";

export const expenseSchema = Joi.object({
  id: Joi.number().optional(),
  companyId: Joi.number().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.date().iso().required(),
});
