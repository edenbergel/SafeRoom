import React, {useState, useEffect} from 'react';
import {dispoSalle} from './dispoSalle'
import './salleitem.scss';
import axios from 'axios';

function SalleItem(props) {

  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [nbPerson, setNbPerson] = useState([]);

  let placesBooking = 0;
  let placesRealTime = 0;
  let allPlacesTaken = 0;
  let dispo = '';

  const nbPlaces = Math.floor(data.area / 4);
  const currentDate = new Date();
  const formatDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  const passId = ()=>{
    localStorage.setItem('idSalle', props.id);
    localStorage.setItem('idSalleName', props.name);
  }

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
  })

  const updateValues = (value)=>{
    placesBooking += value;
    if(nbPerson[props.id]){
      placesRealTime = nbPerson[props.id]._value;
    }
    allPlacesTaken = placesBooking + placesRealTime;
    dispo = dispoSalle(nbPlaces, allPlacesTaken);
  }

  return (
    <div className='SalleItem' onClick={passId}>
      <div className={dispo}></div>
      <p>{data.name}</p>
      <p>{nbPlaces - allPlacesTaken} places restantes</p>
    </div>
  );
}

export default SalleItem;