import React, { useEffect, useState } from 'react';

import Booking from '../Booking/Booking';
import Classrooms from '../Booking/Classrooms';
import Confirmation from '../Booking/Confirmation';
import Dates from '../Booking/Dates';
import Summary from '../Booking/Summary';
import Calendar from '../Calendar/Calendar';
import Dashboard from '../Dashboard/Dashboard';
import Salle from '../Dashboard/Salle';
import SideBar from '../SideBar/SideBar';
import axios from 'axios';

import "./contentuser.scss";

function ContentUser() {

  const idSalle = localStorage.getItem("idSalle");
  const [roleUser, setRoleUser] = useState('');

  useEffect(()=>{
    axios.get('https://saferoom-hetic.herokuapp.com/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      localStorage.setItem('nameUser', response.data.username);
      setRoleUser(response.data.role.name);
    })
    .catch(function (error) {
      console.log(error);
    })
  })

  const renderSwitch = (param)=>{
    if (roleUser === 'Admin') {
      switch(param){
        case '/dashboard':
          return <Dashboard />;
        case "/salles/" + idSalle:
          return <Salle id={idSalle} />;
        case "/calendar":
          return <Calendar role={roleUser} />;
      }
    }
    if (roleUser === 'Student'){
      switch(param){
        case "/calendar":
          return <Calendar role={roleUser} />;
        case '/classrooms':
          return <Classrooms id={idSalle} />;
        case '/booking/' + idSalle:
          return <Dates id={idSalle} />;
        case '/seats/' + idSalle:
          return <Booking id={idSalle} />;
        case '/summary/' + idSalle:
          return <Summary id={idSalle} />;
        case '/confirmation':
          return <Confirmation />;
      }
    }
  };

  return (
    <div className="ContentUser">
      <SideBar />
      <div className="ContentUser_content">
        {renderSwitch(window.location.pathname)}
      </div>
    </div>
  );
}

export default ContentUser;
