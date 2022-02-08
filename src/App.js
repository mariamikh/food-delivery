import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import AppRoute from './Components/AppRoute';
import Header from './Components/helper/header';
import Navigation from './Components/helper/navigation';
import Login from './Components/Login/index';
import { getUserDetails } from './Context/action';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container app-container border">
            <Navigation />

            <div className="container-fluid app-content">
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
          </div>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
