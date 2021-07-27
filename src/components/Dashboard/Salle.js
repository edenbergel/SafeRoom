import './salle.scss';
import {dispoSalle} from './dispoSalle';

import badSalle from '../../assets/badSalle.svg';
import redSalle from '../../assets/redSalle.svg';
import midSalle from '../../assets/midSalle.svg';
import orangeSalle from '../../assets/orangeSalle.svg';
import goodSalle from '../../assets/goodSalle.svg';
import greenSalle from '../../assets/greenSalle.svg';

import React, {useState, useEffect} from 'react';
const axios = require('axios');

function Salle(props) {

  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get(`https://saferoom-hetic.herokuapp.com/salles/${props.id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    })
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  const nbPlaces = Math.floor(data.area / 4);

  const dispo = dispoSalle(nbPlaces, data.placeTaken);

  return (
    <div className='Salle'>
      <div className='Salle_items'>
        <div className='Salle_item'>
          <p>Salle</p>
          <div>
            <p>Nombre de places : {nbPlaces}</p>
            <p className="strong">{data.name}</p>
            <p>{nbPlaces - data.placeTaken} places disponibles</p>
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
            <p className="strong">{data.temperature}°C</p>
          </div>
        </div>
      </div>
      <div className='Salle_availablity'>
        <p>Disponibilités</p>
        <div>
          <div className={dispo === 'green' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
            <img src={goodSalle} />
            <img src={greenSalle} />
            <p>Places encore disponible</p>
          </div>
          <div className={dispo === 'orange' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
            <img src={midSalle} />
            <img src={orangeSalle} />
            <p>Presque plus de places</p>
          </div>
          <div className={dispo === 'red' ? 'Salle_divAvailablity active' : 'Salle_divAvailablity'}>
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