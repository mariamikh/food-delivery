import React, { useState, useEffect } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MealDataService from '../../services/meal.service';
import UploadPreview from '../helper/UploadPreview';
import Alert from 'react-bootstrap/Alert';

export default function EditMealForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState();

  const [id, setId] = useState(props.mealDetails.id);
  const [restaurantId, setRestaurantId] = useState(props.restaurant);
  const [mName, setName] = useState(props.mealDetails.name);
  const [mPrice, setPrice] = useState(props.mealDetails.price);
  const [mImg, setImg] = useState(props.mealDetails.img);
  const [mDesc, setDesc] = useState(props.mealDetails.desc);

  useEffect(() => {
    setName(props.mealDetails.name);
    setPrice(props.mealDetails.price);
    setImg(props.mealDetails.img);
    setDesc(props.mealDetails.desc);
    setId(props.mealDetails.id);
    setRestaurantId(props.restaurant);
  }, [
    props.mealDetails.name,
    props.mealDetails.price,
    props.mealDetails.img,
    props.mealDetails.desc,
  ]);

  const UpdateMeal = async (e) => {
    e.preventDefault();

    MealDataService.update(id, restaurantId, {
      id: id,
      name: mName,
      description: mDesc,
      price: mPrice,
      restaurantId: restaurantId,
    })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  };

  return (
    <div>
      {error ? <Alert variant="danger">{error}</Alert> : ''}

      <a href="#" className="pe-auto" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meal</Modal.Title>
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
                value={mName}
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
                value={mDesc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter description..."
                rows="3"
              ></textarea>
            </div>
            <div class="form-group mb-3">
              <label for="price">price</label>

              <InputGroup className="mb-3 w-25">
                <FormControl
                  id="price"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => setPrice(e.target.value)}
                  value={mPrice}
                />
                <InputGroup.Text id="inputGroup-sizing-sm">$</InputGroup.Text>
              </InputGroup>
            </div>

            <div class="form-group">
              <label for="img">Upload Image</label>
              <UploadPreview id="img" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-block"
            onClick={UpdateMeal}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
