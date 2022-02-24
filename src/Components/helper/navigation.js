import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../Context';
import UserRole from '../../Config/role';

export default function Navigation() {
  // const [role, setRole] = useState('');
  // const [myRestaurant, setMyRestaurant] = useState('');

  const user = useAuthState();
  const dispatch = useAuthDispatch();

  let navigationItems = [
    {
      name: '',
      link: '/',
    },
  ];

  // dispatch({ type: 'ADD_DETAILS', payload: data });

  useEffect(() => {
    console.log('Navigation Component useEffect: ' + JSON.stringify(user));
    //   // var currUser = JSON.parse(localStorage.getItem('currentUser'));
    //   // if (currUser !== null && currUser.userDetails !== null) {
    //   //   setRole(currUser.userDetails.role);
    //   //   setMyRestaurant(currUser.userDetails.myRestaurant);
    //   // }
    //   // console.log('currUser: ' + currUser);
    //   console.log('role: ' + role);
    //   console.log('myRestaurant: ' + myRestaurant);
    //   //role, myRestaurant
  }, [user]);

  // TODO: remove comments
  const role = user.userDetails.role;
  const myRestaurant = user.userDetails.myRestaurant;

  if (role === UserRole.Owner.name) {
    navigationItems = [
      {
        name: 'My Restaurant',
        link: '/restaurant/' + myRestaurant,
      },
      {
        name: 'Restaurant List',
        link: '/restaurant',
      },
      {
        name: 'Order List',
        link: '/r/' + myRestaurant + '/order',
      },
    ];
  } else if (role == UserRole.Regular.name) {
    navigationItems = [
      {
        name: 'Restaurant List',
        link: '/restaurant',
      },
      {
        name: 'Order List',
        link: '/user/' + user.userDetails.user + '/order',
      },
    ];
  }

  return (
    <ul className="nav nav-pills navbar-right side-bar">
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
