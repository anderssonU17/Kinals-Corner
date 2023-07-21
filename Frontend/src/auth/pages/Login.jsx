
import React, { useState } from "react";
<<<<<<< HEAD
import { checkParameters, fetchLogin } from "../api/apiLogin";
import "../../assets/styles/login.css";
import { Link } from "react-router-dom";
=======

import { Link } from "react-router-dom";

import "../../assets/styles/login.css";

>>>>>>> jherrera-2020327
import LogoHd from '../../assets/image/LogoHd.png'
import Swal from "sweetalert2";

export const Login = () => {
    //Cambio de nombre de la pagina
    document.title = 'Login'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    try {
      e.preventDefault();
      const areParametersValid = checkParameters(email, password);
  
      if (areParametersValid) {
        const response = await fetchLogin(email, password);
  
        if (response.data && response.data.ok) {
          // Si la propiedad 'ok' en la respuesta es true, entonces el inicio de sesión fue exitoso
          Swal.fire({
            icon: 'success',
            title: 'Genial',
            text: response.data.message,
            confirmButtonText: 'Ok',
          }).then((r) => {
            if (r.isConfirmed) {
              window.location.href = "/";
            }
          });
        } else {
          // Si la propiedad 'ok' en la respuesta es false, entonces el inicio de sesión fue incorrecto
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message || 'Los datos ingresados son incorrectos.',
            showConfirmButton: true,
            confirmButtonText: 'OK',
          });
        }
      }
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
            <div className="link-new-account">
              <center>
                <p>¿No tienes una cuenta? Crea una dando clic <Link to="/register">aquí.</Link></p>
              </center>
            </div>
        </form>
      </div>
    </>
  );
};
