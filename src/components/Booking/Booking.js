import React, {useState, useEffect} from 'react';
import { InputNumber } from 'antd';

import './booking.scss';
import StepButtons from '../StepButtons/StepButtons';

function Booking() {

  const seats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [nbSeatSelected, setNbSeatSelected] = useState(null);

  const seatsItems = seats.map(seat =>
    <div className="seat__item_wrapper" key={seat}>
      <div className="seat__item"></div>
      <div className="seat__item"></div>
    </div>
  );

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
  }

  useEffect(() => {
    localStorage.setItem("nbSeatSelected", nbSeatSelected);
  },[onQuantityChange]);

  const enableSteps = nbSeatSelected === null ? false : true;

  return (
    <div className="seats__container">
      <div className="seats__inner">
        <div className="seats">
          {seatsItems}
        </div>

        <div>
          <p>Quantité</p>
          <InputNumber min={0} max={8} defaultValue={0} onChange={onQuantityChange} size="large" />
        </div>
      </div>
      <StepButtons prev="hours" next="summary" enableSteps={enableSteps} />
    </div>
  )
}

export default Booking;