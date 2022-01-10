import React, { useState } from 'react';

export default function Meal(props) {
  const { id, name, img, price } = props.meal;

  const [btnText, setBtnText] = useState('Add');

  function changeButton() {
    if (btnText === 'Add') {
      setBtnText('Delete');
      props.onAddToCart();
    } else {
      setBtnText('Add');
      props.onRemoveFromCart();
    }
  }

  {
    /* 
    TODO: paging
    TODO: image is not shown, img url is not read correctly
    TODO: add real image src 
    TODO: add quantity to meal
    TODO:  show selected meal list and total
    TODO: make "Make Order" button more visible"
    */
  }

  return (
    <div class="row p-2 mb-2 bg-white">
      <div class="col-3">
        <img src={img} class="rounded float-left" />
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
          id="input1"
          placeholder="0"
          min="1"
          max="99"
        />
      </div>
    </div>
  );
}
