"use strict"

import axios from "axios";
import Swal from "sweetalert2";

/* const URL = "http://localhost:3002/api/"; */

const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/";
// apiLogin.js
export const fetchLogin = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${URL}login`, data);
    localStorage.setItem('token', response.data.token); // Guarda el token en el local storage

    return response; // Retornamos la respuesta completa del backend
  } catch (error) {
    console.error(error);
    return error.response; // Retornamos la respuesta de error del backend
  }
};




export const checkParameters = (email, password) => {
  if (email.trim().length === 0 || password.trim().length === 0) {
    console.log('Empezando el swal');
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Todos los campos son obligatorios.",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
    return false;
  } else {
    return true;
  }
};
