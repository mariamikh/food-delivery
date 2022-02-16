export function validateCreateRequest(restaurantId, request) {
  if (isNaN(restaurantId) || request === undefined)
    throw Error('Adding meal failed');

  if (request.name === undefined || request.name.length <= 0)
    throw Error('Adding meal failed, meal name is empty');
  if (request.name === undefined || request.name.length <= 0)
    throw Error('Adding meal failed, meal price is empty');
}

export function validateCreateResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Adding meal failed');
  }
}
