import React, {useState, useEffect} from 'react';
import { InputNumber } from 'antd';

import './booking.scss';
import 'antd/dist/antd.css';
import StepButtons from '../StepButtons/StepButtons';
import Message from '../ContentUser/Message';

const axios = require('axios');

function Booking(props) {

  const [nbSeatSelected, setNbSeatSelected] = useState(null);
  const [data, setData] = useState([])

  const enableSteps = nbSeatSelected === null ? false : true;
  
  const placesAvailable = Math.floor(data.area / 4) - data.placeTaken;
  const placesAvailableArray = []

  for (var i = 0; i < placesAvailable; i++) {
    placesAvailableArray.push(
      <div className="seat__item_wrapper" key={i}>
        <div className="seat__item"></div>
        <div className="seat__item"></div>
      </div>
    )
  }
  const onQuantityChange = (value)  => {
    let seatsSelected = document.querySelectorAll('.seat__item_wrapper');
    for (var i = 0; i < seatsSelected.length; i++) {
      if(i <= value - 1){
        seatsSelected[i].classList.add('selected');
      } else {
        seatsSelected[i].classList.remove('selected');
      }
    }

    setNbSeatSelected(value);
    localStorage.setItem("nbSeatSelected", value);
  }

  useEffect(() => {
    axios.get(`https://saferoom-hetic.herokuapp.com/salles/${props.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  },[]);

  return (
    <div className="seats__container padding_content">
      <Message title="Bonjour Léa 👋" text="Bienvenue sur la platform de réservation de salle." step="3/5 : Choisissez une salle" />
      <div className="seats__inner">
        <div className="seats">
          {placesAvailableArray}
        </div>

        <div>
          <p>Quantité</p>
          <InputNumber min={0} max={placesAvailable} defaultValue={0} onChange={onQuantityChange} size="large" />
        </div>
      </div>
      <StepButtons prev={"booking/" + props.id} next={"summary/" + props.id} enableSteps={enableSteps} />
    </div>
  )
}

export default Booking;