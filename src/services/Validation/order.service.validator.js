export function validateCreateResponse(response) {
  if (
    response === undefined ||
    response.data === undefined ||
    isNaN(response.data.id)
  ) {
    throw Error('Order Failed');
  }
}

export function validateGetUserOrdersResponse(response) {
  if (
    response === undefined ||
    response.data === undefined ||
    response.data.length === 0
  ) {
    throw Error('Getting orders failed');
  }
}
