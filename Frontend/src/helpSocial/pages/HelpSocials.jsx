// import React, { useEffect, useState } from "react";
// import { AddHelpSocial } from "../components/AddHelpSocial";
// import { getHelpSocials } from "../api/helpSocials";
// import { HelpSocial } from "../components/HelpSocial";

// export const HelpSocials = () => {
//     document.title = "Ayuda Social";
    
//     const [helpSocials, setHelpSocials] = useState(null);
//     const [adminsitrador, setAdministrador] = useState(true);

//     useEffect(() => {
//         getHelpSocials().then((helpSocials) => setHelpSocials(helpSocials));
//     }, []);

//     const [modalShow, setModalShow] = useState(false);

//     return(
//         <>
//         <div className="container d-flex flex-column mt-4">
//         {adminsitrador && (
//             <div className="d-flex justify-content-end" >
//                 <button
//                 className="btn btn-primary ms-1 col-2 button-addTeacher"
//                 onClick={() => setModalShow(true)}
//                 >
//                     Agregar Ayuda Social
//                 </button>
//             </div>
//         )}
//         {helpSocials == null || helpSocials.length == 0 ?(
//             <h2 className="mt-4"style={{color: 'gray'}}>No se han agregado ayudas sociales...</h2>
//         ):
//         null}
//         </div>
//         <div>
//             <AddHelpSocial
//             show={modalShow}
//             onHide={() => setModalShow(false)}
//             set_helpSocials={setHelpSocials}
//             />
//         </div>

//         <div className="row d-flex justify-content-center">
//                 {helpSocials &&
//                     helpSocials.map((helpSocial) => (
//                         <div key={helpSocial._id}>
//                             <HelpSocial // Correct the component name here
//                                 key={helpSocial._id}
//                                 _idHelpSocial={helpSocial._id}
//                                 title={helpSocial.title}
//                                 description={helpSocial.description}
//                                 setHelpSocials={setHelpSocials}
//                                 helpSocials={helpSocials}
//                                 adminsitrador={adminsitrador}
//                             />
//                         </div>
//                     ))}
//             </div>
//         </>
//     );
// };

// import React, { useEffect, useState } from "react";
// import { AddHelpSocial } from "../components/AddHelpSocial";
// import { getHelpSocials } from "../api/helpSocials";
// import { HelpSocial } from "../components/HelpSocial"; // Correct the component name here

// export const HelpSocials = () => {
//   document.title = "Ayuda Social";

//   const [helpSocials, setHelpSocials] = useState(null);
//   const [adminsitrador, setAdministrador] = useState(true);

//   useEffect(() => {
//     getHelpSocials().then((helpSocials) => setHelpSocials(helpSocials));
//   }, []);

//   const [modalShow, setModalShow] = useState(false);

//   return (
//     <>
//       <div className="container d-flex flex-column mt-4">
//       {adminsitrador && (
//              <div className="d-flex justify-content-end" >
//                  <button
//                  className="btn btn-primary ms-1 col-2 button-addTeacher"
//                  onClick={() => setModalShow(true)}
//                  >
//                      Agregar Ayuda Social
//                  </button>
//              </div>
//          )}
//          {helpSocials == null || helpSocials.length == 0 ?(
//              <h2 className="mt-4"style={{color: 'gray'}}>No se han agregado ayudas sociales...</h2>
//          ):
//          null}
//          </div>
//          <div>
//         <AddHelpSocial
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//           set_helpSocials={setHelpSocials}
//         />
//       </div>

//       <div className="row d-flex justify-content-center">
//         {helpSocials &&
//           helpSocials.map((helpSocial) => (
//             <div key={helpSocial._id}>
//               <HelpSocial
//                 _idHelpSocial={helpSocial._id}
//                 title={helpSocial.title}
//                 description={helpSocial.description}
//                 image={helpSocial.image} // Pass the image prop here
//                 setHelpSocials={setHelpSocials}
//                 helpSocials={helpSocials}
//                 adminsitrador={adminsitrador}
//               />
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddHelpSocial } from '../components/AddHelpSocial';
import { Grid } from '@material-ui/core';

const SocialHelpList = () => {
  const [helpSocials, setHelpSocials] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchHelpSocials();
  }, []);

  const fetchHelpSocials = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/read-helpSocial');
      const claimedHelpsData = localStorage.getItem('claimedHelps');
      const claimedHelps = claimedHelpsData ? JSON.parse(claimedHelpsData) : {};
      const updatedHelpSocials = response.data.map((helpSocial, index) => {
        if (claimedHelps[index]) {
          helpSocial.claimed = true;
        }
        return helpSocial;
      });
      setHelpSocials(updatedHelpSocials);
    } catch (error) {
      console.log('Error al obtener las ayudas sociales', error);
    }
  };

  const saveClaimedHelps = (claimedHelps) => {
    localStorage.setItem('claimedHelps', JSON.stringify(claimedHelps));
  };

  const refreshData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/read-helpSocial');
      const claimedHelpsData = localStorage.getItem('claimedHelps');
      const claimedHelps = claimedHelpsData ? JSON.parse(claimedHelpsData) : {};
      const updatedHelpSocials = response.data.map((helpSocial, index) => {
        if (claimedHelps[index]) {
          helpSocial.claimed = true;
        }
        return helpSocial;
      });
      setHelpSocials(updatedHelpSocials);
    } catch (error) {
      console.log('Error al obtener las ayudas sociales', error);
    }
  };

  const handleClaimantNameChange = (index, event) => {
    const updatedHelpSocials = [...helpSocials];
    updatedHelpSocials[index].claimantName = event.target.value;
    setHelpSocials(updatedHelpSocials);
  };

  const handleSaveClaimantName = async (index) => {
    const helpSocial = helpSocials[index];
    try {
      // Guardar el nombre del reclamante en el backend
      await axios.patch(`http://localhost:3002/api/update-helpSocial/${helpSocial.id}`, {
        claimantName: helpSocial.claimantName,
        claimDate: new Date().toISOString()
      });
      console.log(`Nombre del reclamante y fecha de reclamo guardados para la ayuda social ${index}`);
      const updatedHelpSocials = [...helpSocials];
      updatedHelpSocials[index].claimed = true;
      updatedHelpSocials[index].showForm = false; // Ocultar el formulario
      setHelpSocials(updatedHelpSocials);
      saveClaimedHelps({ ...claimedHelps, [index]: true }); // Guardar las ayudas sociales reclamadas en localStorage
      refreshData(); // Obtener datos actualizados después de reclamar
    } catch (error) {
      console.log('Error al guardar el nombre del reclamante y la fecha de reclamo', error);
    }
  };

  const handleShowForm = (index) => {
    if (!helpSocials[index].claimed) {
      const updatedHelpSocials = [...helpSocials];
      updatedHelpSocials[index].showForm = true;
      setHelpSocials(updatedHelpSocials);
    }
  };

  const renderHelpSocials = () => {
    return helpSocials.map((helpSocial, index) => (
      <div className='card' style={{ marginBottom: 20, marginRight: 100, marginLeft: 350, padding: 20, width: 700 }} key={index}>
        {helpSocial.image && (
          <div className='card-image-container'>
            <img src={convertImageToBase64(helpSocial.image)} className='card-image' alt='Ayuda social' />
          </div>
        )}
        <div className='card-content'>
          <h3>{helpSocial.title}</h3>
          <p className='card-description'>{helpSocial.description}</p>
          <div className='card-details'>
            {helpSocial.claimed ? (
              <div className='card-claim-info'>
                <p className='card-claim-date'>
                  Fecha de reclamo: {helpSocial.claimDate ? new Date(helpSocial.claimDate).toLocaleString() : 'Sin reclamo'}
                </p>
                {helpSocial.claimantName ? (
                  <p className='card-claimant-name'>
                    Nombre del reclamante: {helpSocial.claimantName}
                  </p>
                ) : (
                  <p className='card-claimant-name'>
                    Sin reclamante
                  </p>
                )}
              </div>
            ) : (
              <button className='btn btn-primary ms-1 col-2 button-AddhelpSocial' onClick={() => handleShowForm(index)}>Reclamar</button>
            )}
          </div>
          {helpSocial.showForm && !helpSocial.claimed && (
            <div className='claimant-form'>
              <input
                type='text'
                placeholder='Ingrese el nombre del reclamante'
                value={helpSocial.claimantName || ''}
                onChange={(event) => handleClaimantNameChange(index, event)}
              />
              <button onClick={() => handleSaveClaimantName(index)}>Guardar</button>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className='container'>
      <h2 className='title'>Ayudas Sociales</h2>
      <ul />
      <div className='container d-flex justify-content-end'>
        <button
          className='btn btn-primary ms-1 col-2 button-AddhelpSocial'
          onClick={() => setModalShow(true)}
          style={{ background: '#fbc106', borderColor: '#fbc106' }}
        >
          Agregar ayuda social
        </button>
      </div>
      <ul />
      <AddHelpSocial
        show={modalShow}
        onHide={() => setModalShow(false)}
        set_helpSocial={setHelpSocials}
      />

      {helpSocials.length > 0 ? (
        <div>
          <Grid container spacing={3}>
            {renderHelpSocials()}
          </Grid>
        </div>
      ) : (
        <p className='no-data'>No hay ayudas sociales disponibles</p>
      )}
    </div>
  );
};

export default SocialHelpList;
