import http from '../http-common';
import {
  validateGetAllResponse,
  validateGetResponse,
  validateCreateResponse,
  validateUpdateRequest,
  validateCreateRequest,
} from './Validation/restaurant.service.validator';
import { addTokentoHeader } from './common.service';

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
    console.log(' addTokentoHeader : ' + addTokentoHeader());

    return await http
      .get(`/restaurant/${id}`, addTokentoHeader())
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
      .post('/restaurant', data, addTokentoHeader())
      .then((response) => {
        validateCreateResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Adding restaurant failed');
      });
  }

  async update(id, data) {
    validateUpdateRequest(id, data);
    return await http
      .put(`/restaurant/${id}`, data, addTokentoHeader())
      .catch((e) => {
        throw Error('Updating restaurant failed');
      });
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`, addTokentoHeader());
  }
}

export default new RestaurantDataService();
