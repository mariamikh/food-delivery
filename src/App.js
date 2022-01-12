import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuthState } from './Context';

import routes from './Config/routes.js';
import AppRoute from './Components/AppRoute';
import Header from './Pages/Layout/header';
import SideBar from './Pages/Layout/sideBar';
import Login from './Pages/Login/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const userDetails = useAuthState();
  // console.log(userDetails.userDetails.email);
  console.log(userDetails);

  return (
    <React.Fragment>
      <Header />
      <div className="container app-container border">
        <Login />

        <Router>
          <SideBar />

          <div className="container-fluid app-content">
            {/* <div className="row content">
              <div id="main" className="col-sm-9">
              </div>
            </div>  */}

            <Switch>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
