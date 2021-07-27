import React, {useState} from 'react';
import './sidebar.scss';

import logo from '../../assets/logo.svg';
import ElementMenu from './ElementMenu';

function SideBar(props) {

  return (
    <div className='SideBar'>
      <div>
        <img src={logo} alt='Logo' />
      </div>
      <div>
        <ElementMenu name="Réservations" id="classrooms" />
        <ElementMenu name="Calendrier" id="calendar" />
        <ElementMenu name="Tableau de bord" id="dashboard" />
      </div>
    </div>
  );
}

export default SideBar;