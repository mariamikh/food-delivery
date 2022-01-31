import React from 'react';
import { useAuthDispatch, logout } from '../../Context';
import { getUserDetails } from '../../Context/action';

export default function Header(props) {
  const userDetails = getUserDetails();
  const dispatch = useAuthDispatch();
  const handleLogout = () => {
    logout(dispatch);

    //TODO: uncommenting the follong line gives error, though redirecting //it works without it
    //props.history.push('/login');
  };

  return (
    <div className="container header">
      <nav className="navbar navbar-inverse">
        <div className="navbar-header">
          <h4>Food Delivery </h4>
        </div>

        <ul className="nav navbar-nav navbar-right">
          <li>
            {userDetails !== '' ? (
              <div>
                {userDetails.email}
                <button
                  onClick={handleLogout}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
