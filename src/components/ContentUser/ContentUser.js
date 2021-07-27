<<<<<<< HEAD
import React, { useState } from "react";
import Booking from "../Booking/Booking";
import Confirmation from "../Booking/Confirmation";
import Dates from "../Booking/Dates";
import Hours from "../Booking/Hours";
import Summary from "../Booking/Summary";
import Calendar from "../Calendar/Calendar";
import Dashboard from "../Dashboard/Dashboard";
import Salle from "../Dashboard/Salle";
import SideBar from "../SideBar/SideBar";
=======
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
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636

import "./contentuser.scss";

function ContentUser() {
  const idSalle = localStorage.getItem("idSalle");

  const renderSwitch = (param) => {
    switch (param) {
      case "/dashboard":
        return <Dashboard />;
      case "/calendar":
        return <Calendar />;
<<<<<<< HEAD
      case "/booking":
        return <Dates />;
      case "/hours":
        return <Hours />;
      case "/seats":
        return <Booking />;
      case "/summary":
        return <Summary />;
      case "/confirmation":
=======
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
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636
        return <Confirmation />;
      case "/salles/" + idSalle:
        return <Salle id={idSalle} />;
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
