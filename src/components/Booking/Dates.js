import React, { useState, useEffect } from 'react';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import './dates.scss';

import moment from "moment";
import 'moment/locale/fr';
import StepButtons from '../StepButtons/StepButtons';

function Dates(props) {
  const [dateState, setDateState] = useState(new Date());
  
  const changeDate = (e) => {
    setDateState(e);
  }

  //console.log(moment(dateState + 'UTC').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

  useEffect(() => {
    localStorage.setItem("selectedDateInitial", moment(dateState + 'UTC').utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    localStorage.setItem("selectedDate", moment(dateState).format('dddd Do MMMM YYYY'));
  },[changeDate])

  return (
    <div className="Calendar">
      <Calendar
        onChange={changeDate}
        value={dateState}
        locale="fr-FR"
        tileDisabled={({ date }) => date.getDay() === 6 || date.getDay() === 0 }
        formatShortWeekday={(locale, date) => moment(date).locale("fr").format("dddd")}
        prev2Label={null}
        next2Label={null}
      />
      <StepButtons prev={null} next={"hours/" + props.id}/>
    </div>
  );
}

export default Dates;