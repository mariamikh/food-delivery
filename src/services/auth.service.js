import http from '../http-common';

class AuthDataService {
  async login(data) {
    return await http.post('/login', data).then((response) => {
      if (response !== undefined && response.data !== undefined) {
        return response;
      }
    });
  }
}

export default new AuthDataService();
