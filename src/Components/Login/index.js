import React, { useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();

  function openUserRegistration() {
    history.push('/register');
  }

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(dispatch, { username: email, password: password }).then(
      (value) => {
        history.push('/restaurant');
      }
    );
  };

  return (
    <div className="container login">
      <div className={{ width: 200 }}>
        <h5> Login</h5>
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
            type="submit"
            className="btn btn-secondary "
            onClick={handleLogin}
            disabled={loading}
          >
            login
          </button>
        </form>
        <p onClick={() => openUserRegistration()}>Register New User</p>
      </div>
    </div>
  );
}

export default Login;
