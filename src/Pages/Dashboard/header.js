import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';
import styles from './dashboard.module.css';

export default function Header(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    props.history.push('/login');
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            Food Delivery
          </a>
        </div>

        <ul className="nav navbar-nav navbar-right">
          <li>
            <span className="glyphicon glyphicon-log-in"></span>{' '}
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
