// TODO: add validation via validator library

export function validateGetAllResponse(response) {
  if (
    response === undefined ||
    response.data === undefined ||
    response.data.length === 0
  ) {
    throw Error('Getting Restaurants Failed');
  }
}

export function validateGetResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Getting Restaurant Failed');
  }
}
