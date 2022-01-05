import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../../Context';

export default function SideBar() {
  // TODO: dynamically get user ID(to fetch order list for user or for restaurent) and role(to display relevant navigation)
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  console.log('sidebar: ');
  console.log(userDetails.userDetails.email);

  const user = {
    id: 5,
    role: 'user',
    // role: 'owner'
  };

  const initialValue = [
    {
      name: 'Restaurant List',
      link: '/restaurant',
    },
  ];
  const [sideBarItems, setSideBarItems] = useState(initialValue);

  function retriveSideBarItems() {
    //TODO get userID dynamicaly for user and for restaurant

    if (user !== 'undefined' && user === 'owner') {
      console.log('in IF');
      setSideBarItems([
        {
          name: 'Restaurant List',
          link: '/restaurant',
        },
        {
          name: 'Order List',
          link: '/order/restaurent/1',
        },
        {
          name: 'My Restaurant',
          link: '/restaurent?Owner=1',
        },
      ]);
    } else {
      console.log('in ELSE');

      setSideBarItems([
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
    retriveSideBarItems();
  }, []);

  return (
    <ul class="nav nav-pills navbar-right side-bar border-bottom">
      {sideBarItems.map((r) => (
        <li>
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
