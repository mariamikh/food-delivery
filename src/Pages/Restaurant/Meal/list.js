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
      <div class="col-6">
        <h6>{name}</h6>
        <p>Some description for meal </p>
      </div>
      <h6 class="col-1 align-self-center">{price}$</h6>
      <div class="col-2 align-self-center">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          onClick={() => {
            changeButton();
          }}
        >
          {btnText}
        </button>
      </div>
    </div>

    // <div className="d-flex flex-column">

    //   {restaurantList.map((r) => (
    //     <div
    //       key={r.id}
    //       className="d-flex flex-nowrap bg-light m-2"
    //       onClick={() => openDetails(r.id)}
    //       style={{ cursor: 'pointer' }}
    //     >
    //       <div className="p-2">
    //         <img
    //           src="https://bit.ly/3xBxOZE"
    //           className="img-rounded"
    //           alt="Cinque Terre"
    //         />
    //       </div>
    //       <div className="p-2">
    //         <h6>{r.name}</h6>
    //         <p>{r.address} </p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
