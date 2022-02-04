import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/fontawesome-free-solid';

export default function MealEditable(props) {
  // TODO userRole should not be inside meal
  const { id, name, img, price } = props.meal;

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
      <h6 className="col-2 align-self-center">{price}$</h6>
      <div className="col-2 align-self-center">
        {/* <FontAwesomeIcon icon={faCoffee} /> */}
      </div>
    </div>
  );
}