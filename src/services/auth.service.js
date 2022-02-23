import http from '../http-common';
import {
  validateLoginResponse,
  validateRegisterResponse,
} from './Validation/auth.service.validator';

class AuthDataService {
  async login(data) {
    return await http
      .post('/login', data)
      .then((response) => {
        validateLoginResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('Login Failed');
      });
  }

  async register(data) {
    return await http
      .post('/user', data)
      .then((response) => {
        validateRegisterResponse(response);
        return response.data;
      })
      .catch((e) => {
        throw Error('User registration failed');
      });
  }
}

export default new AuthDataService();
