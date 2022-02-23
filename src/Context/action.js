import AuthDataService from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import UserRole from '../Config/role';

function validateUserData(data) {
  console.log('data' + JSON.stringify(data));

  if (
    data === undefined ||
    data.sub === undefined ||
    data.sub.length <= 0 ||
    data.role === undefined ||
    // TODO: myRestaurant variable should be added to token, uncomment the following check
    //isNaN(data.myRestaurant) ||
    (data.role !== UserRole.Owner.name && data.role !== UserRole.Regular.name)
  )
    throw Error('General Error');
}

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });

    return AuthDataService.login(loginPayload)
      .then((response) => {
        var token = response.jwt;
        var data = jwt_decode(token);
        data.token = token;
        data.user = loginPayload.username;
        validateUserData(data);

        dispatch({ type: 'LOGIN_SUCCESS', payload: data });

        var restaurantId = parseInt(data.restaurantId) || 0;

        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            userDetails: {
              user: loginPayload.username,
              email: data.email,
              role: data.role,
              myRestaurant: restaurantId,
            },
            token: token,
          })
        );

        return data;
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
