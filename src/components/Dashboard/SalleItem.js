import React, {useState, useEffect} from 'react';
import {dispoSalle} from './dispoSalle'
import './salleitem.scss';

function SalleItem(props) {

  const passId = ()=>{
    localStorage.setItem('idSalle', props.id);
  }

  return (
    <div className='SalleItem' onClick={passId}>
      <div className={dispoSalle(props.placesAvailable, props.placesTaken)}></div>
      <p>{props.name}</p>
      <p>{props.placesAvailable - props.placesTaken} places restantes</p>
    </div>
  );
}

export default SalleItem;