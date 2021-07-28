import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./sidebar.scss";
import logo from "../../assets/logo.svg";
import logout from "../../assets/logout.svg";
import ElementMenu from "./ElementMenu";

function SideBar() {

  const [roleUser, setRoleUser] = useState('');

  const disconnect = () => {
    localStorage.removeItem("jwt");
  };

  useEffect(()=>{
    axios.get('https://saferoom-hetic.herokuapp.com/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then(function (response) {
      setRoleUser(response.data.role.name);
    })
    .catch(function (error) {
      console.log(error);
    })
  })

  return (
    <div className="SideBar">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      {roleUser === 'Admin' ?
        <div>
          <ElementMenu name="Tableau de bord" id="dashboard" />
          <ElementMenu name="Calendrier" id="calendar" />
        </div> :
        <div>
          <ElementMenu name="Réservations" id="classrooms" />
          <ElementMenu name="Calendrier" id="calendar" />
        </div>
      }
      <div className="deco" onClick={disconnect}>
        <div className="sign">
          <img src={logout} alt='Icône deconnexion' />
        </div>
        <Link to="/">Déconnexion</Link>
      </div>
    </div>
  );
}

export default SideBar;
