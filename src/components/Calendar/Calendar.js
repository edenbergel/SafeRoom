import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './calendar.scss'
const axios = require('axios');

const localizer = momentLocalizer(moment);
const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

function CalendarGlobal() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
    .get("https://saferoom-hetic.herokuapp.com/bookings")
    .then(function (response) {
      setBookings(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
    

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        formats={formats}
      />
    </div>
  )
}

export default CalendarGlobal;