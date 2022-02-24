import React from 'react';
import { useAuthDispatch, useAuthState, logout } from '../../Context';

export default function Header(props) {
  const user = useAuthState();
  const isAuthenticated =
    user !== 'undefined' &&
    user !== '' &&
    user.userDetails !== 'undefined' &&
    user.userDetails !== ''
      ? true
      : false;

  const dispatch = useAuthDispatch();
  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <div className="container header">
      <nav className="navbar navbar-inverse">
        <div className="navbar-header">
          <h4>Food Delivery </h4>
        </div>
        {isAuthenticated ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <div>
                {user.userDetails.email}
                <button
                  onClick={handleLogout}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        ) : (
          ''
        )}
      </nav>
    </div>
  );
}
