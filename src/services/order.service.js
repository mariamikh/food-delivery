import http from '../http-common';
import {
  validateCreateResponse,
  validateGetUserOrdersResponse,
  validateGetResponse,
  validateUpdateRequest,
} from './Validation/order.service.validator';
import { addTokentoHeader } from './common.service';

class OrderDataService {
  async create(data) {
    return await http
      .post('/order', data, addTokentoHeader())
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
      .get(`/order/${id}`, addTokentoHeader())
      .then((response) => {
        console.log('response: ' + JSON.stringify(response.data));
        validateGetResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting order details failed');
      });
  }

  async getUserOrders(userName) {
    return await http
      .get(`/order?userName=${userName}`, addTokentoHeader())
      .then((response) => {
        validateGetUserOrdersResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error(e.message);
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http
      .put(`/order/${id}`, data, addTokentoHeader())
      .catch((e) => {
        throw Error('Unable to update order');
      });
  }
}

export default new OrderDataService();
