import { isAppError, errorTypeToStatusCode } from '../utils/errorUtils.js';

export default function errorHandlerMiddleware(error, request, response, next) {
  console.log(error);

  if (isAppError(error)) {
    return response.status(errorTypeToStatusCode(error.type)).send(error.message);
  }

  return response.sendStatus(500);
}
