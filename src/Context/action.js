import AuthDataService from '../services/auth.service';
import jwt_decode from 'jwt-decode';

export function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });

    return AuthDataService.login(loginPayload)
      .then((response) => {
        if (response !== 'undefined' && response.data !== 'undefined') {
          var token = response.data.auth_token;
          var data = jwt_decode(token);
          data.token = token;

          dispatch({ type: 'LOGIN_SUCCESS', payload: data });
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              userDetails: {
                user: data.user,
                email: data.email,
                role: data.role,
              },
              token: token,
            })
          );

          return data;
        }
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error: error });
        console.log(error);
      });

    // let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    // let data = await response.json();
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
