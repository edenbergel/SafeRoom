import React, {useState} from 'react';
import Booking from '../Booking/Booking';
import Dates from '../Booking/Dates';
import Hours from '../Booking/Hours';
import Summary from '../Booking/Summary';
import Calendar from '../Calendar/Calendar';
import Dashboard from '../Dashboard/Dashboard';
import Salle from '../Dashboard/Salle';
import SideBar from '../SideBar/SideBar';

import './contentuser.scss';

function ContentUser() {

  const idSalle = localStorage.getItem('idSalle');

  const renderSwitch = (param)=>{
    switch(param){
      case '/dashboard':
        return <Dashboard />;
      case '/calendar':
        return <Calendar />;
      case '/booking':
        return <Dates />;
      case '/hours':
        return <Hours />;
      case '/seats':
        return <Booking />;
      case '/summary':
        return <Summary />;
      case '/salles/' + idSalle:
        return <Salle id={idSalle} />;
    }
  }

  return (
    <div className='ContentUser'>
      <SideBar />
      <div className="ContentUser_content">
        {renderSwitch(window.location.pathname)}
      </div>
    </div>
  );
}

export default ContentUser;