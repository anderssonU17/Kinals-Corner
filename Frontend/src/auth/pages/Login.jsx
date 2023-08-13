import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Importa Navigate
import "../../assets/styles/login.css";
import LogoHd from '../../assets/image/LogoHd.png'
import { Link } from "react-router-dom";
const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}login`, { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      setError('');
      console.log('Usuario autenticado correctamente');

      // Redirige al usuario al foro
      navigate('/foro');
    } catch (error) {
      console.error(error);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container-login">
      <div className="card-login">
        <div className="card-login-title">
          <center><h2>¡Kinals Corner te la bienvenida!</h2></center>
          <center><img src={LogoHd} alt="logo" /></center>
        </div>
        <p>Ingresa tus datos para iniciar sesión</p>
        <form onSubmit={handleSubmit}>
          <div className="content-login">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="content-login">
            <label>Contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-submit-login" type="submit">Iniciar sesión</button>
        </form>
        <div className="link-new-account">
          <center>
            <p>¿No tienes una cuenta? Crea una dando clic <Link to="/register">aquí.</Link></p>
          </center>
        </div>
      </div>
    </div>
  );
};
