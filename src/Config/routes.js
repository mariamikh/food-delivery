import React from 'react';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import RestaurantList from '../Pages/Restaurant/list';
import Restaurant from '../Pages/Restaurant/details/';

const routes = [
  {
    path: '/',
    component: RestaurantList,
    isPrivate: false,
  },
  {
    path: '/restaurant',
    component: Restaurant,
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
