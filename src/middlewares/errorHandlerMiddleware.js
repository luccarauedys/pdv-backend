import { isAppError, errorTypeToStatusCode } from "../utils/errorUtils.js";

export default function errorHandlerMiddleware(error, _request, response, _next) {
  if (isAppError(error)) {
    return response.status(errorTypeToStatusCode(error.type)).send(error.message);
  }

  return response.sendStatus(500);
}
