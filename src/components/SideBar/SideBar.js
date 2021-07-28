import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import axios from 'axios';

import logo from "../../assets/logo.svg";
import ElementMenu from "./ElementMenu";

function SideBar(props) {

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
          <svg
            id="Composant_17_4"
            data-name="Composant 17 – 4"
            xmlns="http://www.w3.org/2000/svg"
            width="17.061"
            height="18.02"
            viewBox="0 0 17.061 18.02"
          >
            <path
              id="Tracé_855"
              data-name="Tracé 855"
              d="M8.792,18.733H6.218A1.931,1.931,0,0,1,4.287,16.8V5.218A1.931,1.931,0,0,1,6.218,3.287H8.792A.644.644,0,0,0,8.792,2H6.218A3.218,3.218,0,0,0,3,5.218V16.8A3.218,3.218,0,0,0,6.218,20.02H8.792a.644.644,0,0,0,0-1.287Z"
              transform="translate(-3 -2)"
              fill="#4461f2"
            />
            <path
              id="Tracé_856"
              data-name="Tracé 856"
              d="M21.657,13.11,17.8,9.287a.646.646,0,1,0-.907.92l2.7,2.69H8.644a.644.644,0,1,0,0,1.287h11l-2.767,2.69a.642.642,0,0,0,.907.907l3.861-3.765a.63.63,0,0,0,.013-.907Z"
              transform="translate(-4.782 -4.531)"
              fill="#4461f2"
            />
          </svg>
        </div>
        <Link to="/">Déconnexion</Link>
      </div>
    </div>
  );
}

export default SideBar;
