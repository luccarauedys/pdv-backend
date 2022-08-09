import { wrongSchemaError } from './errorUtils.js';

export function validateSchema(schema, data) {
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(', ');
    throw wrongSchemaError(messages);
  }
}
