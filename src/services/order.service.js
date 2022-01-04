import http from '../http-common';

class OrderDataService {
  async create(data) {
    // TODO: add dynamic id - /restaurant/${id}/meal
    await http.post('/restaurant/2/order', data).then(() => {
      console.log('Adding new order for restaurant');
    });
  }
}

export default new OrderDataService();
