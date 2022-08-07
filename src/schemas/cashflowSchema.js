import Joi from 'joi';

export const cashflowSchema = Joi.object({
  companyId: Joi.number().required(),
  type: Joi.string().valid(['inflow', 'outflow']).required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
});
