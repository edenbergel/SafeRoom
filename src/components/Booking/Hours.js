import React, {useEffect, useState} from 'react';
import './hours.scss';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";

function Hours() {
  const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23];

  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  const onTimeStart = (time, timeString) => {
    setTimeStart(time, timeString);
  };

  const onTimeEnd = (time, timeString) => {
    setTimeEnd(time, timeString);
  };

  useEffect(() => {
    localStorage.setItem("selectedTimeStart", moment(timeStart).format("HH"));
    localStorage.setItem("selectedTimeEnd", moment(timeEnd).format("HH"));
  },[onTimeStart, onTimeEnd]);

  return (
    <div className="Hours">
      <p>{localStorage.getItem("selectedDate")}</p>

      <TimePicker defaultValue={moment('08:00', 'HH:mm')} format={'HH:mm'} onChange={onTimeStart} disabledHours={() => disabledHours} hideDisabledOptions={true} size="large"/>
      <TimePicker defaultValue={moment('19:00', 'HH:mm')} format={'HH:mm'} onChange={onTimeEnd} disabledHours={() => disabledHours} hideDisabledOptions={true} size="large"/>
      <button onClick={() => window.location.assign('/places')}>Next</button>
    </div>
  );
}

export default Hours;