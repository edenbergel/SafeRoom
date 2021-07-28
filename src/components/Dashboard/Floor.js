import React from 'react';

import './dashboard.scss';

function Floor(props) {

  const onClick = ()=>{
    props.func(props.floor)
  }

  return (
    <div className={props.floor === props.floorSelected ? 'Floor active' : 'Floor'} onClick={onClick}>
      <p>{props.name}</p>
      <div></div>
    </div>
  );
}

export default Floor;