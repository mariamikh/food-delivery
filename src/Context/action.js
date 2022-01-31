import AuthDataService from '../services/auth.service';
import jwt_decode from 'jwt-decode';

// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';
// user: nero@admin.com
// pass: admin123

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
          localStorage.setItem('currentUser', JSON.stringify(data));

          return data;
        }
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error: error });
        console.log(error);
      });

    // let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    // let data = await response.json();

    /* data: 
    {
      {
        "auth_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.5b0YUvXu9IFCI4kqzNAfrnuA2lSMp8XtezIZTfQYH4k",
        "user":{"id":1,"email":"nero@admin.com"}
      }
    }
    */
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
