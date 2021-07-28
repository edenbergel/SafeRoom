import './calendar.scss';
import ModalBooking from '../Calendar/ModalBooking';
import Message from '../ContentUser/Message';

import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const axios = require('axios');

const localizer = momentLocalizer(moment);
const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

function CalendarGlobal(props) {

  const [bookings, setBookings] = useState([]);
  const [modalBooking, setModalBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState();
  let userBooking = [];

  useEffect(() => {
    axios
    .get("https://saferoom-hetic.herokuapp.com/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
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

  bookings.map((booking)=>{ return localStorage.getItem('nameUser') === booking.user ? userBooking.push(booking) : ''; });

  return (
    <div>
      <Message text={props.role === 'Student' ? "Voici le calendrier de vos réservations." : "Voici le calendrier de réservations des étudiants." } />
      <Calendar
        localizer={localizer}
        events={ props.role === 'Student' ? userBooking : bookings}
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
            <ModalBooking key={i} visible={modalBooking} changeVisibility={changeVisibility} date={booking.start} title={booking.title} nbPlaces={booking.nb_places} user={booking.user} />
            :
             ""
          );
        })
      }
    </div>
  )
}

export default CalendarGlobal;