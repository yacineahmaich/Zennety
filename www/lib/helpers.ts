/**
 *  Get a single error message from the api error response
 * @param obj api error response object
 * @returns string
 */

export function getFirstApiErrorMsg(error: ApiError) {
  let errorMessage = error.message;

  if (error.errors) {
    errorMessage =
      Object.entries(error.errors)
        .flatMap(([_, value]) => value)
        .at(0) || errorMessage;
  }

  return errorMessage;
}
