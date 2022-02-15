export function validateCreateResponse(response) {
  if (
    response === undefined ||
    response.data === undefined ||
    isNaN(response.data.id)
  ) {
    throw Error('Order Failed');
  }
}
