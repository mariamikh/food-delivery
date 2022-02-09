import http from '../http-common';

class MealDataService {
  async create(restaurantId, data) {
    console.log('in meal data service: ' + restaurantId);
    return await http
      .post(`/restaurant/${restaurantId}/meal`, data)
      .then((response) => {
        // TODO: handle a case when response or response.data is undefined
        if (response !== undefined && response.data !== undefined)
          return response.data;
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
