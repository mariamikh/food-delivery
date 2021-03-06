// import Login from '../Components/Login';
import NotFound from '../Components/helper/notFound';
import RestaurantList from '../Components/Restaurant/showList';
import Restaurant from '../Components/Restaurant/parentDetails';
import Order from '../Components/Order/details.js';
import OrderList from '../Components/Order/list';
import Login from '../Components/Login';
import Register from '../Components/Login/register';

const routes = [
  {
    path: '/order/:id',
    component: Order,
    isPrivate: true,
  },
  {
    path: '/user/:id/order',
    component: OrderList,
    isPrivate: true,
  },

  {
    path: '/restaurant/:id',
    component: Restaurant,
    isPrivate: true,
  },
  // TODO: r must be changed to restaurant. but it does not work. must fix the bug
  {
    path: '/r/:id/order',
    component: OrderList,
    isPrivate: true,
  },
  {
    path: '/restaurant',
    component: RestaurantList,
    isPrivate: true,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register',
    component: Register,
    isPrivate: false,
  },
  {
    path: '/',
    component: RestaurantList,
    isPrivate: true,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
