import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import myEventsList from './events';

import './calendar.scss'

const localizer = momentLocalizer(moment);

function CalendarGlobal() {

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}

export default CalendarGlobal;