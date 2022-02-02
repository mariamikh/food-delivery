import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../Context';

export default function Navigation() {
  const user = useAuthState();
  let navigationItems = [
    {
      name: '',
      link: '/',
    },
  ];

  const role =
    user !== 'undefined' &&
    user !== '' &&
    user.userDetails != 'undefined' &&
    user.userDetails !== ''
      ? user.userDetails.role
      : '';

  if (role === 'owner') {
    navigationItems = [
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
    ];
  } else if (role == 'user') {
    navigationItems = [
      {
        name: 'Restaurant List',
        link: '/restaurant',
      },
      {
        name: 'Order List',
        link: '/order/user/5',
      },
    ];
  }

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
