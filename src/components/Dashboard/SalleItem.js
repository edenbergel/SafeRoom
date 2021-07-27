import React, {useState, useEffect} from 'react';

import './salleitem.scss';

function SalleItem(props) {

  const colorSalle = (placesAvailable, placesTaken)=>{
    const demi = placesAvailable/2;
    if(placesTaken < demi){
      return 'green';
    }
    if(demi <= placesTaken &&  placesTaken < (demi*2)) {
      return 'orange';
    }
    if(placesTaken === (demi*2)){
      return 'red'
    };
  }

  const passId = ()=>{
    localStorage.setItem('idSalle', props.id);
    localStorage.setItem('idSalleName', props.name);
  }

  return (
    <div className='SalleItem' onClick={passId}>
      <div className={colorSalle(props.placesAvailable, props.placesTaken)}></div>
      <p>{props.name}</p>
      <p>{props.placesAvailable - props.placesTaken} places restantes</p>
    </div>
  );
}

export default SalleItem;