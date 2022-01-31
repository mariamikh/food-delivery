// import Login from '../Pages/Login';
import NotFound from '../Pages/Error/notFound';
import RestaurantList from '../Pages/Restaurant/list';
import Restaurant from '../Pages/Restaurant/details';
import AddMeal from '../Pages/Restaurant/Meal/AddMeal';
import Order from '../Pages/Order/details.js';
import OrderList from '../Pages/Order/list';
import Login from '../Pages/Login';

const routes = [
  {
    path: '/order/user/:id',
    component: OrderList,
    isPrivate: true,
  },
  {
    path: '/order/:id',
    component: Order,
    isPrivate: true,
  },
  {
    path: '/restaurant/:id/meal',
    component: AddMeal,
    isPrivate: true,
  },
  {
    path: '/restaurant/:id',
    component: Restaurant,
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
  // {
  //   path: '/',
  //   component: NotFound,
  //   isPrivate: true,
  // },
  {
    path: '/*',
    component: NotFound,
    isPrivate: false,
  },
];

export default routes;
