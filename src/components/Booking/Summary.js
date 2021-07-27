<<<<<<< HEAD
import React, { useState } from "react";
import StepButtons from "../StepButtons/StepButtons";
import "./summary.scss";
=======
import React from 'react';
import StepButtons from '../StepButtons/StepButtons';
import './summary.scss';
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636

const axios = require("axios");

function Summary() {
  let recapSeatsArray = [];

  for (var i = 0; i < localStorage.getItem("nbSeatSelected"); i++) {
    recapSeatsArray.push(
      <div className="seat__item seat__item-active" key={i}></div>
    );
  }

  const summary = {
<<<<<<< HEAD
    title: null,
=======
    title: localStorage.getItem('idSalleName'),
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636
    start: localStorage.getItem("selectedDateInitial"),
    end: localStorage.getItem("selectedDateInitial"),
    nb_places: localStorage.getItem("nbSeatSelected"),
    user: null,
  };

  const sendDetailsToServer = (e) => {
    e.preventDefault();
    const summaryData = {
<<<<<<< HEAD
      user: "teddy",
      start: summary.start,
      end: summary.end,
      nb_places: summary.nb_places,
      title: "title1",
=======
      user: null,
      start: summary.start,
      end: summary.end,
      nb_places: summary.nb_places,
      title: summary.title,
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636
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
    <div className="summary">
      <div className="summary_wrapper">
        <h1>Récapitulatif de votre réservation</h1>
<<<<<<< HEAD
        <div>
          <p>Date</p> {localStorage.getItem("selectedDate")}
        </div>
        <div>
          <p>Horaires</p> {localStorage.getItem("selectedTimeStart")}h à
          {localStorage.getItem("selectedTimeEnd")}h
        </div>
        <div>
          <p>Salle</p>
        </div>
        <div className="seats">
          <p>
            {localStorage.getItem("nbSeatSelected") > 1 ? "Places" : "Place"}
          </p>
          {recapSeatsArray}
        </div>
=======
        <div><p>Date</p> {localStorage.getItem("selectedDate")}</div>
        <div><p>Horaires</p> {localStorage.getItem("selectedTimeStart")}h à {localStorage.getItem("selectedTimeEnd")}h</div>
        <div><p>Salle</p> {localStorage.getItem('idSalleName')}</div>
        <div className="seats"><p>{localStorage.getItem("nbSeatSelected") > 1 ? 'Places' : 'Place' }</p> {recapSeatsArray}</div>
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636

        <button
          type="submit"
          className="summary_btn"
          onClick={sendDetailsToServer}
        >
          Valider
        </button>
      </div>

      <StepButtons prev="seats" next={null} />
    </div>
  );
}

export default Summary;
