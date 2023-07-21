<<<<<<< HEAD
"use strict"

import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3002/api/";


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

=======
import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3000/api/";
export const login = async (email, password) =>{
        try{
            const response = await axios.post(`${URL}login`, { email, password});
            const token = response.data.token;

            /*if(token){
                localStorage.setItem("token", token);
            }*/

            token && localStorage.setItem("token", token); //Es lo mismo que el if de manera mas liviana
            return token;
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Algo Salió mal',
                text: 'No se ha podido iniciar sesión'
            })
    }
}
>>>>>>> jcastro-2021416
