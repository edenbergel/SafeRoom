import React from 'react';
import Message from '../ContentUser/Message';
import './booking.scss';

function Confirmation() {

  return (
    <div className="confirmation">
      <Message text="Bienvenue sur la plateforme de réservation." step="5/5 : Votre réservation a été enregistrée" />
      <h1>Votre réservation est validée</h1>
      <div className="confirmation_icon"></div>
      <button
          type="submit"
          className="primary_btn"
          onClick={() => window.location.assign('/calendar')}
        >
        Voir mes réservations
      </button>
    </div>
  )
}

export default Confirmation;