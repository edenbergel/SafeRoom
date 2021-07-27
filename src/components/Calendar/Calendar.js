import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './calendar.scss'
import ModalBooking from '../Calendar/ModalBooking';
import Message from '../ContentUser/Message';
const axios = require('axios');

const localizer = momentLocalizer(moment);
const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

function CalendarGlobal() {
  const [bookings, setBookings] = useState([]);
  const [modalBooking, setModalBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState();

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

  const changeVisibility = ()=>{
    setModalBooking(false);
  }

  const idReservation = (value)=>{
    setBookingInfo(value.id);
    setModalBooking(true);
  }

  return (
    <div>
      <Message title="Bonjour Léa 👋" text="Voici le calendrier de vos réservations" />
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        formats={formats}
        getDrilldownView={() =>
          { return null; }
        }
        onSelectEvent={idReservation}
      />

      {
        bookings.map((booking, i)=>{
          return( booking.id === bookingInfo ? 
            
            <ModalBooking key={i} visible={modalBooking} changeVisibility={changeVisibility} date={booking.start} title={booking.title} nbPlaces={booking.nb_places} /> 
            : ""
          );
        })
      }
      
    </div>
  )
}

export default CalendarGlobal;