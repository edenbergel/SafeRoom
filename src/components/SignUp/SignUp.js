import React, {useState} from 'react';
import './signup.scss';
import {Link} from "react-router-dom";


import logowhite from '../../assets/logo-white.svg';

function SignUp(props) {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const {id , value} = e.target
    setLogin(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  return (
    <div className='SignUp'>
      <div>
        <div className='SignUp_form'>
          <h1>Bienvenue sur Safe Room</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              value={login.email} 
              onChange={handleChange}
            />
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Mot de passe" 
              value={login.password} 
              onChange={handleChange}
            />
           <Link to="/dashboard">
            <button type="submit">Connexion</button>
           </Link>
          </form>
        </div>
      </div>
      <div>
        <img src={logowhite} alt='Logo blanc' />
      </div>
    </div>
  );
}

export default SignUp;