import React from 'react';
import Meal from '../Meal';

export default function Restaurent() {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="panel panel-default text-left">
          <div className="panel-body">
            <p>Tabla</p>
            <p>Rustaveli Ave.</p>
          </div>
        </div>
      </div>

      <Meal />
      <Meal />
      <Meal />
      <Meal />
    </div>
  );
}
