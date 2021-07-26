import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import myEventsList from './events';

import './calendar.scss'

const localizer = momentLocalizer(moment);
const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

function CalendarGlobal() {

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        formats={formats}
      />
    </div>
  )
}

export default CalendarGlobal;