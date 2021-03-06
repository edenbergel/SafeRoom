import './booking.scss';
import Message from '../ContentUser/Message';
import StepButtons from './StepButtons';

import React from 'react';
const axios = require("axios");

function Summary(props) {
  let recapSeatsArray = [];

  for (var i = 0; i < localStorage.getItem("nbSeatSelected"); i++) {
    recapSeatsArray.push(
      <div className="seat__item seat__item-active" key={i}></div>
    );
  }

  const summary = {
    title: localStorage.getItem('idSalleName'),
    start: localStorage.getItem("selectedDateInitial"),
    end: localStorage.getItem("selectedDateInitial"),
    nb_places: localStorage.getItem("nbSeatSelected"),
    user: null,
  };

  const sendDetailsToServer = (e) => {
    e.preventDefault();
    const summaryData = {
      user: localStorage.getItem('nameUser'),
      start: summary.start,
      end: summary.end,
      nb_places: summary.nb_places,
      title: summary.title,
    };
    axios
      .post("https://saferoom-hetic.herokuapp.com/bookings", summaryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }
      })
      .then(function () {
        redirectToConfirmation();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const redirectToConfirmation = () => {
    window.location.assign("/confirmation");
  };

  return (
    <div className="summary padding_content">
      <Message text="Bienvenue sur la plateforme de réservation." step="4/5 : Vérifiez les informations de votre réservation" />
      <div className="summary_wrapper">
        <h1>Récapitulatif de votre réservation</h1>
        <div><p>Date</p> {localStorage.getItem("selectedDate")}</div>
        <div><p>Salle</p> {localStorage.getItem('idSalleName')}</div>
        <div className="seats"><p>{localStorage.getItem("nbSeatSelected") > 1 ? 'Places' : 'Place' }</p> {recapSeatsArray}</div>

        <button
          type="submit"
          className="primary_btn"
          onClick={sendDetailsToServer}
        >
          Valider
        </button>
      </div>

      <StepButtons prev={"seats/" + props.id} next={null} />
    </div>
  );
}

export default Summary;
