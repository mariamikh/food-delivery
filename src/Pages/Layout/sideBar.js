import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="col-sm-3">
      <ul>
        <li>
          <Link to="/restaurant"> Restaurent List </Link>
        </li>
        <li>
          <Link to="/order"> Order List </Link>
        </li>
      </ul>
    </div>
  );
}
