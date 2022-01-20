import React from 'react';

export default function Meal(props) {
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
    <div class="row p-2 mb-2 bg-white">
      <div class="col-3">
        <img src={img} alt="" class="rounded float-left" />
      </div>
      <div class="col-5">
        <h6>{name}</h6>
        <p>Some description for meal </p>
      </div>
      <h6 class="col-1 align-self-center">{price}$</h6>
      <div class="col-3 align-self-center">
        <input
          type="number"
          class="form-control form-control-sm"
          id="quantity"
          placeholder="0"
          min="0"
          max="99"
          onChange={(e) => changeQuantity(e.target.value)}
        />
      </div>
    </div>
  );
}
