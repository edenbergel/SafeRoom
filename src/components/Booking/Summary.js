import React from 'react';

import './summary.scss';

function Summary() {

  let recapSeatsArray = [];
  
  for (var i = 0; i < localStorage.getItem("nbSeatSelected"); i++) {
    recapSeatsArray.push(<div className="seat__item seat__item-active" key={i}></div>)
  }

  return (
    <div>
      <p>{localStorage.getItem("selectedDate")}</p>
      <p>{localStorage.getItem("selectedTimeStart")}h à {localStorage.getItem("selectedTimeEnd")}h</p>
      <div className="seats">{recapSeatsArray}</div>
    </div>
  )
}

export default Summary;