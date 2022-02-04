import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../../Error';
import RestaurantDataService from '../../../services/restaurant.service';
import UploadPreview from '../../Layout/UploadPreview';

export default function EditMeal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(props.mealDetails.name);
  const [price, setPrice] = useState(props.mealDetails.price);
  const [img, setImg] = useState(props.mealDetails.img);
  const [desc, setDesc] = useState(props.mealDetails.desc);
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
          <form>
            <div class="form-group mb-3">
              <label for="name">name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                name="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name..."
              />
            </div>
            <div class="form-group mb-3">
              <label for="desc">description</label>
              <textarea
                id="desc"
                type="text"
                class="form-control"
                name="desc"
                label="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter description..."
                rows="3"
              ></textarea>
            </div>
            <div class="form-group mb-3">
              <label for="price">price</label>
              <input
                id="price"
                type="text"
                class="form-control"
                name="price"
                label="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price..."
              />
            </div>

            <div class="form-group">
              <label for="img">Upload Image</label>
              <UploadPreview id="img" />
            </div>
          </form>

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
