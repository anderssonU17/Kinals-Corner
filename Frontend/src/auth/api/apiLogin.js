"use strict"

import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3002/api/";

export const fetchLogin = async (email, password) => {
  try {
    let token
    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${URL}login`, data);
    token = response.data.token
    Swal.fire({
      icon: 'success',
      title: "¡Exito!",
      text: 'El inicio de sesion ha sido exitoso.',
      showConfirmButton: true,
      confirmButtonText: "ok",
    }).then(
      () => {
        localStorage.setItem('token', token)
      }
    )
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message || "Error en el servidor.",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
};

export const checkParameters = async(email, password) => {

  if (email.trim().length === 0 || password.trim().length === 0) {
    console.log('Empezando el swal');
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Todos los campos son obligatorios.",
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
    return false
  }else{
    await fetchLogin(email, password)
  }
};
