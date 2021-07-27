import React, { useState } from "react";
import "./signup.scss";
import axios from "axios";
import logowhite from "../../assets/logo-white.svg";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
function SignUp(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const [user, setUser] = useState();
  const [connected, setConnected] = useState(false);

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
      .catch((message) => {
        setError("Une erreur est survenue, veuillez réessayer.");
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="SignUp">
      {localStorage.getItem("jwt") ? (
        <Redirect
          to={{
            pathname: "/dashboard",
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
                {error ? <div class="error">{error}</div> : ""}
                {connected === true ? (
                  <Redirect
                    to={{
                      pathname: "/dashboard",
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
