import React from 'react';
import Booking from '../Booking/Booking';
import Classrooms from '../Booking/Classrooms';
import Confirmation from '../Booking/Confirmation';
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
      case '/classrooms':
        return <Classrooms id={idSalle}/>;
      case '/booking/' + idSalle:
        return <Dates id={idSalle} />;
      case '/hours/' + idSalle:
        return <Hours id={idSalle} />;
      case '/seats/' + idSalle:
        return <Booking id={idSalle} />;
      case '/summary/' + idSalle:
        return <Summary id={idSalle} />;
      case '/confirmation':
        return <Confirmation />;
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