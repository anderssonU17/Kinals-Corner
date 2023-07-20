import React, { useState } from "react";
import { checkParameters } from "../api/apiLogin";

import "../../assets/styles/login.css";
import { Link } from "react-router-dom";

import LogoHd from '../../assets/image/LogoHd.png'

export const Login = () => {
    //Cambio de nombre de la pagian
    document.title = 'Login'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    try {
      e.preventDefault();
      checkParameters(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-login">
        <form onSubmit={login}>
          <div className="card-login">
            <div className="card-login-title" >
                <center><h2>¡Kinals Corner te la bienvenida!</h2></center>
            <center><img src={LogoHd} alt="logo" /></center>
            </div>
            <p>Ingresa tus datos para iniciar sesión</p>
            <div className="content-login">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="content-login">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success btn-submit-login" type="submit">
              Inicias Sesión
            </button>
          </div>
          <Link>
            <div className="link-new-account">
              <center>
                <p>¿No tienes una cuenta? Crea una dando clic aquí.</p>
              </center>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};
