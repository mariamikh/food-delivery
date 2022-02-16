import http from '../http-common';
import {
  validateGetAllResponse,
  validateGetResponse,
  validateCreateResponse,
  validateUpdateRequest,
  validateCreateRequest,
} from './Validation/restaurant.service.validator';

class RestaurantDataService {
  async getAll() {
    return await http
      .get(`/restaurant`)
      .then((response) => {
        validateGetAllResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting restaurants failed');
      });
  }

  async get(id) {
    return await http
      .get(`/restaurant/${id}`)
      .then((response) => {
        validateGetResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting restaurant failed');
      });
  }

  async create(data) {
    validateCreateRequest(data);
    return await http
      .post('/restaurant', data)
      .then((response) => {
        validateCreateResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Adding restaurant railed');
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http.put(`/restaurant/${id}`, data).catch((e) => {
      throw Error('Updating restaurant failed');
    });
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`);
  }
}

export default new RestaurantDataService();
