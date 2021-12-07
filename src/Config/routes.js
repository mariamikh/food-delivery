import React from 'react';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import RestaurantList from '../Pages/Restaurant/list';
import Restaurant from '../Pages/Restaurant/details/';

const routes = [
  {
    path: '/restaurant/:id',
    component: Restaurant,
    isPrivate: false,
  },
  {
    path: '/restaurant',
    component: RestaurantList,
    isPrivate: false,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/',
    component: NotFound,
    isPrivate: false,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
