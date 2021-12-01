import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './Config/routes.js';
import { AuthProvider } from './Context';
import AppRoute from './Components/AppRoute';
import Header from './Pages/Layout/header';
import Footer from './Pages/Layout/footer';
import SideBar from './Pages/Layout/sideBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />

      <div className="container-fluid">
        <div className="row content">
          <SideBar />
          <div id="main" className="col-sm-9">
            <Router>
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
            </Router>
          </div>
        </div>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
