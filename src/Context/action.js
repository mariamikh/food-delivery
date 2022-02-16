import AuthDataService from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import UserRole from '../Config/role';

function validateUserData(data) {
  if (
    data === undefined ||
    data.user === undefined ||
    data.user.length <= 0 ||
    data.email === undefined ||
    data.user.email <= 0 ||
    data.role === undefined ||
    isNaN(data.myRestaurant) ||
    (data.role !== UserRole.Owner.name && data.role !== UserRole.Regular.name)
  )
    throw Error('General Error');
}

export function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });

    return AuthDataService.login(loginPayload)
      .then((response) => {
        if (response !== 'undefined' && response.data !== 'undefined') {
          var token = response.data.auth_token;
          var data = jwt_decode(token);
          data.token = token;
          validateUserData(data);

          dispatch({ type: 'LOGIN_SUCCESS', payload: data });

          var restaurantId = parseInt(data.myRestaurant) || 0;

          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              userDetails: {
                user: data.user,
                email: data.email,
                role: data.role,
                myRestaurant: restaurantId,
              },
              token: token,
            })
          );

          return data;
        }
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error: error });
      });
  } catch (error) {
    console.log('Catching');
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
