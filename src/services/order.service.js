import http from '../http-common';
import { validateCreateResponse } from './Validation/order.service.validator';

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

  getUserOrders(userId) {
    return http.get('/user/' + userId + '/order');
  }

  update(id, data) {
    return http.put(`/order/${id}`, data);
  }
}

export default new OrderDataService();
