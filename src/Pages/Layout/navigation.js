import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuthDispatch, useAuthState } from '../../Context';
import { useAuthState } from '../../Context';

export default function Navigation() {
  // const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const userInitialValue = {
    id: 5,
    // role: 'user',
    role: 'owner',
  };

  const initialValue = [
    {
      name: 'Restaurant List',
      link: '/restaurant',
    },
  ];
  const [navigationItems, setNavigationItems] = useState(initialValue);
  const [user, setUser] = useState(userInitialValue);

  function getUserDetails() {
    // TODO: dynamically get user ID(to fetch order list for user or for restaurent) and role(to display relevant navigation)

    console.log('Navigation: ');
    console.log(userDetails.userDetails.email);
  }

  function getNavigationItems() {
    getUserDetails();

    //TODO get userID dynamicaly for user and for restaurant

    if (user !== 'undefined' && user === 'owner') {
      console.log('in IF');
      setNavigationItems([
        {
          name: 'My Restaurant',
          link: '/restaurent?Owner=1',
        },
        {
          name: 'Restaurant List',
          link: '/restaurant',
        },
        {
          name: 'Order List',
          link: '/order/restaurent/1',
        },
      ]);
    } else {
      console.log('in ELSE');

      setNavigationItems([
        {
          name: 'Restaurant List',
          link: '/restaurant',
        },
        {
          name: 'Order List',
          link: '/order/user/5',
        },
      ]);
    }
  }

  useEffect(() => {
    getNavigationItems();
  }, []);

  return (
    <ul className="nav nav-pills navbar-right side-bar border-bottom">
      {navigationItems.map((r) => (
        <li key={r.name}>
          <Link
            to={r.link}
            style={{ textDecorationLine: 'none', marginLeft: 30 }}
          >
            {r.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
