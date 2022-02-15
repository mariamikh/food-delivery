import http from '../http-common';
import {
  validateGetAllResponse,
  validateGetResponse,
} from '../services/restaurant.service.validator';

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
    return await http.post(`/restaurant`, data).then((response) => {
      if (response !== undefined && response.data !== undefined)
        return response.data;
    });
  }

  update(id, data) {
    return http.put(`/restaurant/${id}`, data);
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`);
  }
}

export default new RestaurantDataService();
