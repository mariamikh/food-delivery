import React from 'react';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import RestaurentList from '../Pages/Restaurent/list';
import Restaurent from '../Pages/Restaurent/details/';

const routes = [
  {
    path: '/',
    component: RestaurentList,
    isPrivate: false,
  },
  {
    path: '/Restaurent',
    component: Restaurent,
    isPrivate: false,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
