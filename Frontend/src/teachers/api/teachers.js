"use strict";

import axios from "axios";
import Swal from "sweetalert2";

/* const URL = "http://localhost:3002/api/"; */
const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/"

//Obtener el listado de todos los profesores
export const getTeachers = async () => {
  try {
    const response = await axios.get(`${URL}getAllTeachers`);
    return response.data.teachers;
  } catch (error) {
    console.error(error);
  }
};

//Agregar el profesor
export const createTeacher = async (name, subject, email, image) => {
  try {
    let fileExtension = image.type + "";
    fileExtension = fileExtension.split("/").pop();

    if (
      fileExtension == "png" ||
      fileExtension == "jpg" ||
      fileExtension == "jpeg" ||
      fileExtension == "gif"
    ) {
      const data = {
        name: name,
        subject: subject,
        email: email,
      };

      const response = await axios.post(`${URL}addTeacher`, data);
      const newTeacher = response.data.newTeacher;

      addImageTeacher(newTeacher._id, image);
    } else {
      Swal.fire({
        icon: "info",
        title: "El tipo del archivo no es admitido",
        showConfirmButton: true,
        confirmButtonColor: "tomato",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
};

//Agregar imagen al profesor
export const addImageTeacher = async (teacherId, image, edit) => {
  try {
    const data = {
      teacherId: teacherId,
      image: image,
    };

    const response = await axios.put(`${URL}addImageTeacher`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: `${
          edit ? "Se edito correctamente al" : "Se agrego al"
        } profesor correctamente.`,
        showConfirmButton: true,
        confirmButtonColor: "#32FF00",
      });
    }
    // return response;
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.msg,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
};

//Eliminar profesor
export const deleteTeacher = async (teacherId) => {
  try {
    const response = await axios.delete(`${URL}deleteTeacher`, {
      data: {
        teacherId: teacherId,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

//Ventan de sweetAlert para confirmar que se quiere eliminar el profesor
export const confirmDeleteTeacher = (teacherId, setTeachers, teachers) => {
  Swal.fire({
    icon: "question",
    text: "¿Estas seguro de eliminar este profesor?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "tomato",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#32FF00",
  }).then((r) => {
    if (r.isConfirmed) {
      deleteTeacher(teacherId).then(() => {
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
      });
    }
  });
};

//Actualizar profesor
export const updateTeacher = async (teacherId, name, email, subject, image) => {
  try {
    let fileExtension = image.type + "";
    fileExtension = fileExtension.split("/").pop();

    if (
      fileExtension == "png" ||
      fileExtension == "jpg" ||
      fileExtension == "jpeg" ||
      fileExtension == "gif"
    ) {
      const data = {
        teacherId: teacherId,
        name: name,
        email: email,
        subject: subject,
      };

      const response = await axios.put(`${URL}updateTeacher`, data);

      if (image) {
        await addImageTeacher(teacherId, image, true);
      } else {
        response &&
          Swal.fire({
            icon: "success",
            title: "Se edito el profesor correctamente.",
            showConfirmButton: true,
            confirmButtonColor: "#32FF00",
          });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "El tipo del archivo no es admitido",
        showConfirmButton: true,
        confirmButtonColor: "tomato",
      });
      return;
    }
  } catch (error) {
    console.error(error.response.data.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
};
