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
  if (response === undefined || response.data === undefined) {
    throw Error('Getting orders failed');
  }

  if (response.data.length === 0) throw Error('User has no order');
}

export function validateGetResponse(response) {
  if (response === undefined || response.data === undefined) {
    throw Error('Getting order details failed');
  }

  if (
    response.data.orderDetails.length === 0 ||
    response.data.orderHistories.length === 0 ||
    response.data.orderDetails === undefined ||
    response.data.orderHistories === undefined ||
    response.data.status === undefined
  )
    throw Error('No order');
}

export function validateUpdateRequest(id, data) {
  if (id === undefined || data === undefined)
    throw Error('Unable to update order');
}
