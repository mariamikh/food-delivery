import http from '../http-common';
import {
  validateCreateResponse,
  validateGetUserOrdersResponse,
  validateGetResponse,
  validateUpdateRequest,
} from './Validation/order.service.validator';

class OrderDataService {
  async create(data) {
    return await http
      .post('/order', data)
      .then((response) => {
        validateCreateResponse(response);
        return response.data.id;
      })
      .catch((e) => {
        throw Error('Order Failed');
      });
  }

  async get(id) {
    return await http
      .get(`/order/${id}`)
      .then((response) => {
        validateGetResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting order details failed');
      });
  }

  async getUserOrders(userId) {
    return await http
      .get('/user/' + userId + '/order')
      .then((response) => {
        validateGetUserOrdersResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting orders failed');
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http.put(`/order/${id}`, data).catch((e) => {
      throw Error('Unable to update order');
    });
  }
}

export default new OrderDataService();
