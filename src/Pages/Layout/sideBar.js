import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../../Context';

export default function SideBar() {
  // TODO: dynamically get user ID to fetch order list for user or for restaurent
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  console.log('sidebar: ');
  console.log(userDetails.userDetails.email);

  return (
    // TODO if restaurent owner is logged on then restaurent ordets should be returned
    <div className="col-sm-3">
      <ul>
        <li>
          <Link to="/restaurant"> Restaurant List </Link>
        </li>
        <li>
          <Link to="/order/user/5"> Order List </Link>
        </li>
      </ul>
    </div>
  );
}
