import React from 'react';
import { useAuthState } from '../../Context';
import UserRole from '../../Config/role';

export default function MealList(props) {
  const { id, name, img, price } = props.meal;

  // TODO userRole should not be inside meal
  const canOrder =
    useAuthState().userDetails.role === UserRole.Owner.name ? false : true;

  function changeQuantity(quantity) {
    props.changeTotal(id, price, quantity);
  }

  /* 
    TODO: paging
    TODO: image is not shown, img url is not read correctly
    TODO: add real image src 
    */

  return (
    <div className="row p-2 mb-2 bg-white">
      <div className="col-3">
        <img src={img} alt="" className="rounded float-left" />
      </div>
      <div className="col-5">
        <h6>{name}</h6>
        <p>Some description for meal </p>
      </div>
      <h6 className="col-1 align-self-center">{price}$</h6>

      {canOrder ? (
        <div className="col-3 align-self-center">
          <input
            type="number"
            className="form-control form-control-sm"
            id="quantity"
            placeholder="0"
            min="0"
            max="99"
            onChange={(e) => changeQuantity(e.target.value)}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
