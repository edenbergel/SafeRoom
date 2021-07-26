import React, {useState} from 'react';
import './summary.scss';

const axios = require('axios');

function Summary() {

  let recapSeatsArray = [];
  
  for (var i = 0; i < localStorage.getItem("nbSeatSelected"); i++) {
    recapSeatsArray.push(<div className="seat__item seat__item-active" key={i}></div>)
  }

  const summary = {
    title: null,
    //start: "2021-07-26T16:48:33.911Z",
    //end: "2021-07-26T16:48:33.911Z",
    nb_places: localStorage.getItem("nbSeatSelected"),
    user: null
  }

  console.log(summary.end, summary.start);
  const sendDetailsToServer = (e) => {
    e.preventDefault()
      const summaryData = {
        "user": summary.user,
        "start": "2021-07-30T16:48:33.911Z",
        "end": "2021-07-30T17:48:33.911Z",
        "nb_places": summary.nb_places,
        "title": summary.title,
      }
      console.log(summaryData);
      axios.post('https://saferoom-hetic.herokuapp.com/reservations', summaryData)
      .then(function (response) {
        console.log(response);
        //redirectToTest()
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="summary">
      <h1>Récapitulatif de votre réservation</h1>
      <div><p>Date</p> {localStorage.getItem("selectedDate")}</div>
      <div><p>Horaires</p> {localStorage.getItem("selectedTimeStart")}h à {localStorage.getItem("selectedTimeEnd")}h</div>
      <div><p>Salle</p> </div>
      <div className="seats"><p>{localStorage.getItem("nbSeatSelected") > 1 ? 'Places' : 'Place' }</p> {recapSeatsArray}</div>

      <button type="submit" className="summary_btn" onClick={sendDetailsToServer}>Valider</button>
    </div>
  )
}

export default Summary;