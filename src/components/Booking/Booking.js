import React, {useState, useEffect} from 'react';
import { InputNumber } from 'antd';

import './booking.scss';
import 'antd/dist/antd.css';
import StepButtons from './StepButtons';
import Message from '../ContentUser/Message';
import moment from 'moment';

const axios = require('axios');

function Booking(props) {

  let placesBooking = 0;
  const [nbSeatSelected, setNbSeatSelected] = useState(null);
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);

  const enableSteps = nbSeatSelected === null ? false : true;
  
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

    axios.get(`https://saferoom-hetic.herokuapp.com/bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setBookings(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  },[]);

  const hasBookings =
    bookings.map((booking)=>{
      return (moment(booking.start).format('YYYY-M-DD') === moment(localStorage.getItem("selectedDateInitial")).format('YYYY-M-DD') ? placesBooking += booking.nb_places : '');
    });

  const placesAvailable = Math.floor(data.area / 4) - placesBooking;
  const placesAvailableArray = []

  for (var i = 0; i < placesAvailable; i++) {
    placesAvailableArray.push(
      <div className="seat__item_wrapper" key={i}>
        <div className="seat__item"></div>
        <div className="seat__item"></div>
      </div>
    )
  }

  return (
    <div className="seats__container padding_content">
      <Message text="Bienvenue sur la platform de réservation de salle." step="3/5 : Choisissez une salle" />
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