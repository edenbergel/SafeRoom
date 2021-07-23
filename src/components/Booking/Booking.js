import React, {useState, useEffect} from 'react';
import { InputNumber } from 'antd';

import './booking.scss';

function Booking() {

  const seats = [0, 1, 2, 3, 4, 5, 6];
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

  return (
    <div className="seats__container">
      <div className="seats">
        {seatsItems}
      </div>
      <InputNumber min={0} max={7} defaultValue={0} onChange={onQuantityChange} />
      <button onClick={() => window.location.assign('/recap')}>Next</button>
    </div>
  )
}

export default Booking;