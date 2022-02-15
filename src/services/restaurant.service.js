import http from '../http-common';
import {
  validateGetAllResponse,
  validateGetResponse,
  validateCreateResponse,
  validateUpdateRequest,
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
        throw Error('Getting Restaurants Failed');
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
        throw Error('Getting Restaurant Failed');
      });
  }

  async create(data) {
    return await http
      .post('/restaurant', data)
      .then((response) => {
        validateCreateResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Adding Restaurant Failed');
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http.put(`/restaurant/${id}`, data).catch((e) => {
      throw Error('Updating Restaurant Failed');
    });
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`);
  }
}

export default new RestaurantDataService();
