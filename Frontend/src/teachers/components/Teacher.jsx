import React, { useEffect, useState } from "react";
import { confirmDeleteTeacher } from "../api/teachers";

export const Teacher = ({ _idTeacher, name, subject, email, setTeachers, teachers, administrador }) => {

  return (
    <>
      <div style={styles.containerTeacher}>
        <div className="d-flex flex-column justify-content-center">
          <img
            src={`http://localhost:3002/api/getImageTeacher/${_idTeacher}`}
            alt="Imagen"
            style={styles.image}
          ></img>
          <h6 className="mt-3" style={styles.nameTeacher}>
            {name}
          </h6>
        </div>

        <div className="ms-4">
          <h5>Información</h5>
          <hr />
          <h6 style={styles.subTitles}>Materia:</h6>
          <h6>{"" + subject}</h6>
          <h6 style={styles.subTitles}>Contacto:</h6>
          <h6>{"" + email}</h6>

          {administrador && (
            <div style={styles.buttonsFooter}>
              <button className="btn btn-danger" onClick={() => { confirmDeleteTeacher(_idTeacher, setTeachers, teachers) }}>Eliminar</button>
              <button className="btn btn-warning ms-4">Editar</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  containerTeacher: {
    display: "flex",
    border: "1px solid #D5D5D5",
    borderRadius: "10px",
    maxWidth: "450px",
    width: "450px",
    margin: "20px",
    padding: "30px",
  },
  image: {
    height: "100px",
    width: "100px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  nameTeacher: {
    maxWidth: "150px",
  },
  subTitles: {
    color: "gray",
  },
  buttonsFooter: {
    marginTop: "20px",
  },
};
