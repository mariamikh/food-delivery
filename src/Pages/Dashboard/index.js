import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';
import styles from './dashboard.module.css';
import Header from './header';

function Dashboard(props) {
  // const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  // const handleLogout = () => {
  //   logout(dispatch);
  //   props.history.push('/login');
  // };
  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <div className={styles.dashboardPage}>
          <h1>Dashboard</h1>
          {/* <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button> */}
        </div>
        <p>
          Welcome{' '}
          {userDetails !== undefined && userDetails.user !== undefined
            ? userDetails.user.email
            : ''}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
