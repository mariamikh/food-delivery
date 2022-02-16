import http from '../http-common';
import {
  validateCreateResponse,
  validateGetUserOrdersResponse,
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

  get(id) {
    return http.get(`/order/${id}`);
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

  update(id, data) {
    return http.put(`/order/${id}`, data);
  }
}

export default new OrderDataService();
