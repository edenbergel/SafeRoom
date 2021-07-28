import React from 'react';
import Message from '../ContentUser/Message';
import StepButtons from '../StepButtons/StepButtons';
import './confirmation.scss'

function Confirmation() {

  return (
    <div className="confirmation">
      <Message text="Bienvenue sur la platform de réservation de salle." step="5/5 : Choisissez une salle" />
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