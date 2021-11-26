import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';
import styles from './dashboard.module.css';
import Header from './header';
import SideBar from './sideBar';

function Dashboard(props) {
  // const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  // const handleLogout = () => {
  //   logout(dispatch);
  //   props.history.push('/login');
  // };
  return (
    // <div classNameName="sb-nav-fixed">
    //   <Header />
    //   <SideBar />
    //   <div style={{ padding: 10 }}>
    //     <div classNameName={styles.dashboardPage}>
    //       <h1>Dashboard</h1>
    //       {/* <button classNameName={styles.logoutBtn} onClick={handleLogout}>
    //         Logout
    //       </button> */}
    //     </div>
    //     <p>
    //       Welcome{' '}
    //       {userDetails !== undefined && userDetails.user !== undefined
    //         ? userDetails.user.email
    //         : ''}
    //     </p>
    //   </div>
    // </div>
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row content">
          <SideBar />
          <div className="col-sm-9">
            <h2>I Love Food</h2>
            <p>
              Food is my passion. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </div>
      </div>
      <footer className="container-fluid">
        <p>Footer Text</p>
      </footer>
    </div>
  );
}

export default Dashboard;
