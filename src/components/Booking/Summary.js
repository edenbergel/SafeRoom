import React from 'react';
import StepButtons from '../StepButtons/StepButtons';
import './summary.scss';

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
      user: null,
      start: summary.start,
      end: summary.end,
      nb_places: summary.nb_places,
      title: summary.title,
    };
    axios
      .post("https://saferoom-hetic.herokuapp.com/bookings", summaryData)
      .then(function (response) {
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
      <div className="summary_wrapper">
        <h1>Récapitulatif de votre réservation</h1>
        <div><p>Date</p> {localStorage.getItem("selectedDate")}</div>
        <div><p>Horaires</p> {localStorage.getItem("selectedTimeStart")}h à {localStorage.getItem("selectedTimeEnd")}h</div>
        <div><p>Salle</p> {localStorage.getItem('idSalleName')}</div>
        <div className="seats"><p>{localStorage.getItem("nbSeatSelected") > 1 ? 'Places' : 'Place' }</p> {recapSeatsArray}</div>

        <button
          type="submit"
          className="summary_btn"
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
