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

export function validateUpdateRequest(id, restaurantId, request) {
  if (isNaN(id) || isNaN(restaurantId) || request === undefined)
    throw Error('Updating meal failed');

  if (request.name === undefined || request.name.length <= 0)
    throw Error('Updating meal failed, meal name is empty');
  if (request.name === undefined || request.name.length <= 0)
    throw Error('Updating meal failed, meal price is empty');
}

export function validateDeleteRequest(id, restaurantId) {
  if (isNaN(id) || isNaN(restaurantId)) throw Error('Deleting meal failed');
}
