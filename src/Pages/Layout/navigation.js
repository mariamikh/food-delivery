import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../Context';

export default function Navigation() {
  const user = useAuthState();
  const initialValue = [
    {
      name: '',
      link: '/',
    },
  ];
  const [navigationItems, setNavigationItems] = useState(initialValue);

  function getUserRole() {
    let isAuthenticated =
      user !== 'undefined' &&
      user !== '' &&
      user.userDetails != 'undefined' &&
      user.userDetails !== ''
        ? true
        : false;

    return isAuthenticated ? user.userDetails.role : '';
  }

  function getNavigationItems() {
    const role = getUserRole();
    console.log('Navigation, role=' + role);

    if (role === 'owner') {
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
    } else if (role == 'user') {
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
  }, [user]);

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
