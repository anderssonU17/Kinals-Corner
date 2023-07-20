import React, { useEffect, useState } from "react";
import { Teacher } from "../components/teacher";
import { getTeachers } from "../api/teachers";
import axios from "axios";
import { AddTeacher } from "../components/AddTeacher";

export const Teachers = () => {

  //Cambiar titulo de la pagina
  document.title = 'Profesores'

  const [teachers, setTeachers] = useState([]);

  const [administrador, setAdministrador] = useState(true);

  //Llmado a la funcion para ver los profesores

  useEffect(() => {
    //Cuando se tenga la respuesta se cambiara el valor del estado teachers
    getTeachers().then((teachers) => setTeachers(teachers));

  }, []);

  // Modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <h1>Profesores</h1>

      {/* ****Este componenete se debe mostrar solo si el usuario logueado es de tipo administrador ****/}
      {administrador && (
        <button
          className="btn btn-primary ms-1"
          onClick={() => setModalShow(true)}
        >
          Agregar profesor
        </button>
      )}

      {/* Modal */}
      <div>

      <AddTeacher show={modalShow} onHide={() => setModalShow(false)} set_teachers ={setTeachers} />
      </div>

      <div className="row d-flex justify-content-center">
        {teachers &&
          teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="col-sm-7 col-lg-5 d-flex align-self-center justify-content-center"
            >
              <Teacher
                key={teacher._id}
                _idTeacher={teacher._id}
                name={teacher.name}
                subject={teacher.subject}
                email={teacher.email}
                
                // Manejo del arrelgo de adminisatradores
                setTeachers={setTeachers}
                teachers={teachers}

                //Manejo del rol del usuario
                administrador={administrador}
              />
            </div>
          ))}
        {/* Mensaje para cuando no hayan profesores */}
        {teachers == null && (
          <div className="container" style={{height: '80vh', width: '100vw'}}>
            <h2>No se han agregado profesores....</h2>
          </div>
        )}
      </div>
    </>
  );
};
