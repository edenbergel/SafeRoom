import React from 'react';
import moment from "moment";

import close from '../../assets/close.svg'
import './calendar.scss'

function ModalBooking(props) {

  const closeForm = ()=>{
    props.changeVisibility(false);
  }

  return (
    <div className={props.visible === true ? "modalBooking active" : "modalBooking"}>

      <div className="modalBooking_wrapper">
        <img className='modalBooking_close' src={close} onClick={closeForm} alt="Icône fermeture réservation" />

        <h3>Réservation</h3>
        <p className="modalBooking_date">{moment(props.date).format('dddd Do MMMM')}</p>

        <div className="modalBooking_info_wrap">
          <p className="modalBooking_class">{props.title}</p>
          <p>{props.nbPlaces}
            {
              props.nbPlaces > 1 ? " places réservées" : " place réservée"
            }
          </p>
        </div>
        <p>Nom de la réservation : {props.user}</p>
      </div>
      <div className="shade"></div>
    </div>
  )
}

export default ModalBooking;