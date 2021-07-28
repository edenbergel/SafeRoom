import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./signup.scss";
import logowhite from "../../assets/logo-white.svg";


function SignUp() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [connected, setConnected] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handeSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://saferoom-hetic.herokuapp.com/auth/local", {
        identifier: login.email,
        password: login.password,
      })
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        setConnected(true);
      })
      .catch(() => {
        setError("Une erreur est survenue, veuillez réessayer.");
      });
  };

  return (
    <div className="SignUp">
      {localStorage.getItem("jwt") ? (
        <Redirect
          to={{
            pathname: "/calendar",
          }}
        />
      ) : (
        <>
          <div>
            <div className="SignUp_form">
              <h1>Bienvenue sur Safe Room</h1>
              <form onSubmit={handeSubmit}>
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
                <button type="submit">Connexion</button>
                {error ? <div className="error">{error}</div> : ""}
                {connected === true ? (
                  <Redirect
                    to={{
                      pathname: "/calendar",
                    }}
                  />
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
          <div>
            <img src={logowhite} alt="Logo blanc" />
          </div>
        </>
      )}
    </div>
  );
}

export default SignUp;
