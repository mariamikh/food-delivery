import React, { useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import AuthDataService from '../../services/auth.service';
import jwt_decode from 'jwt-decode';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();

  async function loginUser() {
    try {
      dispatch({ type: 'REQUEST_LOGIN' });

      AuthDataService.login({ email, password })
        .then((response) => {
          if (response !== 'undefined' && response.data !== 'undefined') {
            var token = response.data.auth_token;
            var data = jwt_decode(token);

            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));

            console.log('in action: ' + JSON.stringify(data));
            // TODO Redirect to content
          }
        })
        .catch((error) => {
          // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
          console.log(error);
        });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error });
    }
  }

  async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  return (
    <div className="container login">
      <div className={{ width: 200 }}>
        <h5>Login Page</h5>
        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
        <form>
          <div className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary "
            onClick={loginUser}
            disabled={loading}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
