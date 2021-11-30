import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';
import styles from './dashboard.module.css';
import Header from './header';
import SideBar from './sideBar';
import Restaurent from '../Restaurent/details';
import RestaurentList from '../Restaurent/list';

function Dashboard(props) {
  const userDetails = useAuthState();

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row content">
          <SideBar />
          <div id="main" className="col-sm-9">
            <RestaurentList />
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
