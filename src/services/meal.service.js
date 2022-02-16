import http from '../http-common';
import {
  validateCreateResponse,
  validateCreateRequest,
} from './Validation/meal.service.validator';

class MealDataService {
  async create(restaurantId, data) {
    validateCreateRequest(restaurantId, data);
    return await http
      .post(`/restaurant/${restaurantId}/meal`, data)
      .then((response) => {
        validateCreateResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Adding meal failed');
      });
  }

  update(restaurantId, id, data) {
    return http.put(`/restaurant/${restaurantId}/meal/${id}`, data);
  }

  delete(id, restaurantId) {
    return http.delete(`/restaurant/${restaurantId}/meal/${id}`);
  }
}

export default new MealDataService();
