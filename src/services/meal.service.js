import http from '../http-common';
import {
  validateCreateResponse,
  validateCreateRequest,
  validateUpdateRequest,
  validateDeleteRequest,
} from './Validation/meal.service.validator';
import { addTokentoHeader } from './common.service';

class MealDataService {
  async create(restaurantId, data) {
    validateCreateRequest(restaurantId, data);
    return await http
      .post(`/restaurant/${restaurantId}/meal`, data, addTokentoHeader())
      .then((response) => {
        validateCreateResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Adding meal failed');
      });
  }

  async update(id, restaurantId, data) {
    validateUpdateRequest(id, restaurantId, data);
    return await http
      .put(`/restaurant/${restaurantId}/meal/${id}`, data, addTokentoHeader())
      .catch((e) => {
        throw Error('Updating meal failed');
      });
  }

  async delete(id, restaurantId) {
    validateDeleteRequest(id, restaurantId);
    return await http
      .delete(`/restaurant/${restaurantId}/meal/${id}`, addTokentoHeader())
      .catch((e) => {
        throw Error('Deleting meal failed');
      });
  }
}

export default new MealDataService();
