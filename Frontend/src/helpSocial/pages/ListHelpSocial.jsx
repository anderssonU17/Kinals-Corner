import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/ListHelpSocial.css';

export const ListHelpSocial = () => {
  const [helpSocials, setHelpSocials] = useState([]);
  const currentDate = new Date().toLocaleString();

  useEffect(() => {
    fetchHelpSocials();
  }, []);

  const fetchHelpSocials = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/read-helpSocial');
      setHelpSocials(response.data);
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
      // Actualizar el nombre del reclamante en el backend utilizando Axios
      await axios.patch(`http://localhost:3002/api/helpSocial/${helpSocial._id}`, {
        claimantName: helpSocial.claimantName,
      });
      console.log(`Nombre del reclamante guardado para la ayuda social ${index}`);
    } catch (error) {
      console.log('Error al guardar el nombre del reclamante', error);
    }

    // Ocultar el formulario después de guardar
    const updatedHelpSocials = [...helpSocials];
    updatedHelpSocials[index].showForm = false;
    setHelpSocials(updatedHelpSocials);
  };

  const handleShowForm = (index) => {
    const updatedHelpSocials = [...helpSocials];
    updatedHelpSocials[index].showForm = true;
    setHelpSocials(updatedHelpSocials);
  };

  const renderHelpSocials = () => {
    if (!helpSocials) {
      return null;
    }

    return helpSocials.map((helpSocial, index) => (
      <div className='card' key={index}>
        {helpSocial.image && (
          <div className='card-image-container'>
            <img
              src={`data:image/png;base64,${helpSocial.image.toString('base64')}`} // Convert Buffer to base64
              className='card-image'
              alt='Ayuda social'
            />
          </div>
        )}
        <div className='card-content'>
          <h3>{helpSocial.title}</h3>
          <p className='card-description'>{helpSocial.description}</p>
          <div className='card-details'>
            <p className='card-claimed'>
              Reclamado: {helpSocial.claimed ? 'Sí' : 'No'}
            </p>
            {helpSocial.claimed && (
              <div className='card-claim-info'>
                <p className='card-claim-date'>
                  Fecha de reclamo: {helpSocial.claimDate ? new Date(helpSocial.claimDate).toLocaleString() : 'Sin reclamo'}
                </p>
                <p className='card-claimant-name'>
                  Nombre del reclamante: {helpSocial.claimantName || 'Sin reclamante'}
                </p>
              </div>
            )}
            {!helpSocial.claimed && !helpSocial.claimantName && !helpSocial.showForm && (
              <div className='claimant-form'>
                <input
                  type='text'
                  placeholder='Ingrese su nombre'
                  value={helpSocial.claimantName || ''}
                  onChange={(event) => handleClaimantNameChange(index, event)}
                />
                <button onClick={() => handleSaveClaimantName(index)}>
                  Guardar
                </button>
              </div>
            )}
            {/* {!helpSocial.claimed && !helpSocial.claimantName && helpSocial.showForm && (
              <div className='claimant-form'>
                <input
                  type='text'
                  placeholder='Ingrese su nombre'
                  value={helpSocial.claimantName || ''}
                  onChange={(event) => handleClaimantNameChange(index, event)}
                />
                <button onClick={() => handleSaveClaimantName(index)}>
                  Guardar
                </button>
              </div>
            )} */}
            {!helpSocial.claimed && helpSocial.claimantName && (
              <div className='card-claimant-info'>
                <p className='card-claimant-name'>
                  Nombre del reclamante: {helpSocial.claimantName}
                </p>
                <button onClick={() => handleShowForm(index)}>
                  Editar nombre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>Ayudas Sociales</h1>
      <p>Fecha actual: {currentDate}</p>
      <div className='card-list'>{renderHelpSocials()}</div>
    </div>
  );
};




































