import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import AppRoute from './Components/AppRoute';
import Header from './Pages/Layout/header';
import Navigation from './Pages/Layout/navigation';
import Login from './Pages/Login/index';
import { useAuthState } from './Context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const userDetails = useAuthState();
  // console.log(userDetails.userDetails.email);
  console.log('in APP: ' + JSON.stringify(userDetails));

  return (
    <React.Fragment>
      <Router>
        {userDetails.user ? (
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
        ) : (
          <Login />
        )}
      </Router>
    </React.Fragment>
  );
}

export default App;
