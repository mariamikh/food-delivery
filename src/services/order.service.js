import http from '../http-common';
import {
  validateCreateResponse,
  validateGetOrdersResponse,
  validateGetResponse,
  validateUpdateRequest,
} from './Validation/order.service.validator';
import { addTokentoHeader } from './common.service';
import UserRole from '../Config/role';

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

  async getOrdersbyRole(id, role) {
    var url =
      role === UserRole.Owner.name
        ? `/order/restaurant/${id}`
        : `/order?userName=${id}`;

    return await http
      .get(url, addTokentoHeader())
      .then((response) => {
        validateGetOrdersResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error(e.message);
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http
      .patch(`/order/${id}`, data, addTokentoHeader())
      .catch((e) => {
        throw Error('Unable to update order');
      });
  }
}

export default new OrderDataService();
