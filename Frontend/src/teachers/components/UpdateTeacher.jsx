import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Swal from "sweetalert2";
import { createTeacher, getTeachers, updateTeacher } from "../api/teachers";

export const UpdateTeacher = (props) => {
  const [nameTeacher, setNameTeacher] = useState(props.name);
  const [subject, setSubject] = useState(props.subject);
  const [email, setEmail] = useState(props.email);

  //Estado para la imagen
  const [imageTeacher, setImageTeacher] = useState(null);

  //Cambiar el valor por defecto de estados de cada input
  useEffect(() => {
    setNameTeacher(props.name)
    setSubject(props.subject)
    setEmail(props.email)
  }, [])
  

  // Funcion para comprobar los campos de envio
  const checkParameters = () => {
    if (
      nameTeacher.trim().length == 0 ||
      subject.trim().length == 0 ||
      email.trim().length == 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "Debe llenar todos los campos para agregar al nuevo profesor.",
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "tomato",
      });
      return false;
    }
    return true;
  };

  //Cancelar el actualizar
  const cancelAddTeacher = () => {
    setImageTeacher(null);
    setNameTeacher("");
    setEmail("");
    setSubject("");
    props.onHide();
  };

  //Actualizar
  const fetchUpdateTeacher = async () => {
    try {
      //Comprobar que se hayan llenado todos los parametros
      if (!checkParameters()) return;

      //Guardar la imagen en un formulario
      const image = new FormData();
      image.append("image", image);

      await updateTeacher( props._idTeacher,nameTeacher, email,subject, imageTeacher)

      props.onHide();
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Profesor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <h6>Datos para actualizar al profesor: </h6>
        <div className="mb-3 col-8">
          <label className="form-label">Nombre:</label>
          <input
            value={nameTeacher}
            type="text"
            className="form-control"
            onChange={(e) => setNameTeacher(e.target.value)}
          />

          <label className="form-label">Materia / Clase: </label>
          <input
            value={subject}
            type="text"
            className="form-control"
            onChange={(e) => setSubject(e.target.value)}
          />

          <label className="form-label">Correo - Contacto: </label>
          <input
            value={email}
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Agregar la imagen */}
          <label className="form-label mt-2">
            Foto del profesor (solo si la deseas cambiar) :
          </label>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImageTeacher(e.target.files[0])}
            />
          </div>
          <div className="d-flex align-items-center">
            <p>Foto que ya se tenia:</p>
            <img
              className="ms-4"
              src={`http://localhost:3002/api/getImageTeacher/${props._idTeacher}`}
              alt="Imagen"
              width={"50px"}
            ></img>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-success"
          onClick={() => {
            fetchUpdateTeacher();
          }}
        >
          Actualizar
        </Button>

        <Button
          className="btn btn-danger"
          onClick={() => {
            cancelAddTeacher();
          }}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
