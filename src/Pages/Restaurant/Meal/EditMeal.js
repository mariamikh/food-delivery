import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../../Error';
import RestaurantDataService from '../../../services/restaurant.service';

export default function EditMeal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(props.mealDetails.name);
  const [price, setPrice] = useState(props.mealDetails.price);
  const [img, setImg] = useState(props.mealDetails.img);
  const [err, setErr] = useState('');

  const handleEditingMeal = async (e) => {
    e.preventDefault();

    RestaurantDataService.create({
      name,
      price,
      img,
    })
      .then(() => {
        props.history.push('/');
      })
      .catch((error) => {
        //TODO: handle error
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div>
      <a href="#" className="pe-auto" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <input
                type="text"
                name="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name..."
              />
            </li>
            <li>
              <input
                type="text"
                name="img"
                label="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Enter image..."
              />
            </li>
            <li>
              <input
                type="text"
                name="price"
                label="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price..."
              />
            </li>
          </ul>

          {err !== undefined && err !== '' ? <Error text={err} /> : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <input
            type="submit"
            value="Add Meal"
            className="btn btn-primary btn-block"
            onClick={handleEditingMeal}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
