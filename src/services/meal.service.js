import http from '../http-common';

class MealDataService {
  update(restaurantId, id, data) {
    return http.put(`/restaurant/${restaurantId}/meal/${id}`, data);
  }

  delete(id, restaurantId) {
    return http.delete(`/restaurant/${restaurantId}/meal/${id}`);
  }
}

export default new MealDataService();
