// TODO: add validation via validator library

export function validateGetAllResponse(response) {
  if (
    response === undefined ||
    response.data === undefined ||
    response.data.length === 0
  ) {
    throw Error('Getting restaurants failed');
  }
}

export function validateGetResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Getting restaurant failed');
  }
}

export function validateCreateRequest(request) {
  if (request === undefined) throw Error('Adding restaurant failed');

  if (request.name === undefined || request.name.length <= 0)
    throw Error('Adding restaurant failed, restaurant name is empty');
}

export function validateCreateResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Adding restaurant failed');
  }
}
export function validateUpdateRequest(id, data) {
  if (isNaN(id) || data === undefined) {
    throw Error('Adding restaurant failed');
  }
}
