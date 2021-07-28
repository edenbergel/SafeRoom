import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import 'moment/locale/fr';

import './booking.scss';
import StepButtons from './StepButtons';
import Message from '../ContentUser/Message';

function Dates(props) {

  const [dateState, setDateState] = useState(moment().add(1, 'day')._d);
  const now = new Date();

  const changeDate = (e) => {
    setDateState(e);
  }

  useEffect(() => {
    localStorage.setItem("selectedDateInitial", moment(dateState + 'UTC').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    localStorage.setItem("selectedDate", moment(dateState).format('dddd Do MMMM YYYY'));
  },[changeDate])

  return (
    <div className="Calendar padding_content">
      <Message text="Bienvenue sur la plateforme de réservation." step="2/5 : Choisissez une date" />
      <Calendar
        onChange={changeDate}
        value={dateState}
        locale="fr-FR"
        tileDisabled={({ date }) => date.getDay() === 6 || date.getDay() === 0 || date < now }
        prev2Label={null}
        next2Label={null}
      />
      <StepButtons prev={null} next={"seats/" + props.id}/>
    </div>
  );
}

export default Dates;