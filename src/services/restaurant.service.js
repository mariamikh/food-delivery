import http from '../http-common';
import { validateGetAllResponse } from '../services/restaurant.service.validator';

class RestaurantDataService {
  // getAll() {
  //   return http.get('/restaurant');
  // }

  async getAll() {
    return await http
      .get(`/restaurant`)
      .then((response) => {
        validateGetAllResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Getting Restaurant Failed');
      });
  }

  get(id) {
    return http.get(`/restaurant/${id}`);
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
