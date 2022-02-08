// import Login from '../Components/Login';
import NotFound from '../Components/helper/notFound';
import RestaurantList from '../Components/Restaurant/list';
import Restaurant from '../Components/Restaurant/parentDetails';
import AddMeal from '../Components/Meal/AddMealForm';
import Order from '../Components/Order/details.js';
import OrderList from '../Components/Order/list';
import Login from '../Components/Login';

const routes = [
  {
    path: '/order/:id',
    component: Order,
    isPrivate: true,
  },
  {
    path: '/restaurent/:id/order',
    component: OrderList,
    isPrivate: true,
  },
  {
    path: '/user/:id/order',
    component: OrderList,
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
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
