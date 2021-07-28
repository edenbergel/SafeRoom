import './booking.scss';
import SalleItem from '../Dashboard/SalleItem';
import Floor from '../Dashboard/Floor';

import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Message from '../ContentUser/Message';
const axios = require('axios');

function Classrooms() {

  const [floor, setFloor] = useState(0);
  const [salles, setSalles] = useState([]);

  useEffect(()=>{
    axios.get(`https://saferoom-hetic.herokuapp.com/salles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setSalles(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  const isSelected = (value)=>{
    setFloor(value);
  }

  salles.map(salle =>{ 
    localStorage.setItem("selectedDate", salle);
  })

  return (
    <div className='Classroom padding_content'>
      <Message text="Bienvenue sur la plateforme de réservation." step="1/5 : Choisissez une salle" />
      <div className='Classroom_floors'>
        <Floor name='Étage 1' floor={1} floorSelected={floor} func={isSelected} />
        <Floor name='Rez de chaussée' floor={0} floorSelected={floor} func={isSelected} />
      </div>
      <div className='Classroom_salles'>
        {salles.map((salle, i)=>{
          const placesAvailable = Math.floor(salle.area / 4) - salle.placeTaken;
          return(
            salle.step == floor && placesAvailable > 0 ? <Link to={'/booking/' + salle.id} key={i}> <SalleItem key={i} name={salle.name} id={salle.id} placesAvailable={Math.floor(salle.area / 4)} id={salle.id} placesTaken={salle.placeTaken} /></Link> : ''
          );
        })}
      </div>
    </div>
  );
}

export default Classrooms;