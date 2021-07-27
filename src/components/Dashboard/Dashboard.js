import './dashboard.scss';
import SalleItem from './SalleItem';
import Floor from './Floor';
import AddSalle from './AddSalle';

import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Message from '../ContentUser/Message';
const axios = require('axios');

function Dashboard(props) {

  const [floor, setFloor] = useState(0);
  const [salles, setSalles] = useState([]);
  const [addSalle, setAddSalle] = useState(false);

  useEffect(()=>{
    axios.get(`https://saferoom-hetic.herokuapp.com/salles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setSalles(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })


  }, [])

  const isSelected = (value)=>{
    setFloor(value);
  }

  const viewForm = ()=>{
    setAddSalle(true);
  }

  const changeVisibility = ()=>{
    setAddSalle(false);
  }

  return (
    <div className='Dashboard'>
      <Message title="Bonjour Léa 👋" text="Bienvenue sur votre tableau de bord" />
      <div className='Dashboard_salles'>
        {salles.map((salle, i)=>{
          return(
            salle.step == floor ? <Link key={i} to={'/salles/' + salle.id}> <SalleItem key={i} name={salle.name} placesAvailable={Math.floor(salle.area / 4)} id={salle.id} placesTaken={salle.placeTaken} /></Link> : ''
          );
        })}
      </div>
      <AddSalle visible={addSalle} changeVisibility={changeVisibility} />
      <p className='Dashboard_button' onClick={viewForm}>Ajouter une salle</p>
      <div className='Dashboard_floors'>
        <Floor name='Étage 1' floor={1} floorSelected={floor} func={isSelected} />
        <Floor name='Rez de chaussée' floor={0} floorSelected={floor} func={isSelected} />
      </div>

      <div className={addSalle ? "shade active" : "shad"}></div>
    </div>
  );
}

export default Dashboard;