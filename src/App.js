import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './Config/routes.js';
import { AuthProvider } from './Context';
import AppRoute from './Components/AppRoute';
import Header from './Pages/Layout/header';
import SideBar from './Pages/Layout/sideBar';
import Login from './Pages/Login/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="container content border">
        <Login />

        {/*
        <div className="container-fluid">
          <div className="row content">
            <Router>
              <SideBar />
              <div id="main" className="col-sm-9">
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
                  
        </div>*/}
      </div>
    </AuthProvider>
  );
}

export default App;
