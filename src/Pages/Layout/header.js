import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';

export default function Header(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  console.log(userDetails.userDetails.email);
  const handleLogout = () => {
    logout(dispatch);

    //TODO: uncommenting the follong line gives error, though redirecting //it works without it
    //props.history.push('/login');
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
            {userDetails !== undefined &&
            userDetails.userDetails !== undefined ? (
              <div>
                {userDetails.userDetails.email}
                <button onClick={handleLogout}> Logout </button>
              </div>
            ) : (
              <button>Login</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
