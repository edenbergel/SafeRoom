import './salle.scss';
import {dispoSalle} from './dispoSalle';
import moment from 'moment';

import badSalle from '../../assets/badSalle.svg';
import redSalle from '../../assets/redSalle.svg';
import midSalle from '../../assets/midSalle.svg';
import orangeSalle from '../../assets/orangeSalle.svg';
import goodSalle from '../../assets/goodSalle.svg';
import greenSalle from '../../assets/greenSalle.svg';

import React, {useState, useEffect} from 'react';
const axios = require('axios');

function Salle(props) {

  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tempSalles, setTempSalles] = useState([]);
  const [nbPerson, setNbPerson] = useState([]);

  let placesBooking = 0;
  let placesRealTime = 0;
  let allPlacesTaken = 0;
  let tempSalle = 0;
  let dispo = '';

  const nbPlaces = Math.floor(data.area / 4);
  const currentDate = new Date();
  const formatDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  useEffect(()=>{
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

    axios.get(`https://safer-hetic-api.herokuapp.com/api/v2/temperature`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setTempSalles(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })

    axios.get(`https://safer-hetic-api.herokuapp.com/api/v2/nb_personnes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setNbPerson(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  const updateValues = (value)=>{
    placesBooking += value;
    if(tempSalles[props.id] && nbPerson[props.id]){
      tempSalle = tempSalles[props.id]._value;
      placesRealTime = nbPerson[props.id]._value;
    }
    allPlacesTaken = placesBooking + placesRealTime;
    dispo = dispoSalle(nbPlaces, allPlacesTaken);
  }

  return (
    <div className='Salle'>
      {bookings.map((booking, i)=>{
        return(formatDate === moment(booking.start).format('YYYY-M-DD') ? updateValues(booking.nb_places) : '')
      })}
      <div className='Salle_items'>
        <div className='Salle_item'>
          <p>Salle</p>
          <div>
            <p>Nombre de places : {nbPlaces}</p>
            <p className="strong">{data.name}</p>
            <p>{nbPlaces - allPlacesTaken} places disponibles</p>
          </div>
        </div>
        <div className='Salle_item'>
          <p>Superficie</p>
          <div>
            <p className="strong">{data.area}m2</p>
          </div>
        </div>
        <div className='Salle_item'>
          <p>Temperature</p>
          <div>
            <p className="strong">{tempSalle}°C</p>
          </div>
        </div>
      </div>
      <div className='Salle_availablity'>
        <p>Disponibilités</p>
        <div>
          <div className={dispo == 'green' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
            <img src={goodSalle} />
            <img src={greenSalle} />
            <p>Places encore disponible</p>
          </div>
          <div className={dispo == 'orange' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
            <img src={midSalle} />
            <img src={orangeSalle} />
            <p>Presque plus de places</p>
          </div>
          <div className={dispo == 'red' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
            <img src={badSalle} />
            <img src={redSalle} />
            <p>Plus de places disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Salle;