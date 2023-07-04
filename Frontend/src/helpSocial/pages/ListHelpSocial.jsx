import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/ListHelpSocial.css';
import icono from '../../assets/image/AyudaSocial.png';

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
      // Guardar el nombre del reclamante en el backend
      await axios.put(`http://localhost:3002/api/helpSocial/${helpSocial.id}`, {
        claimantName: helpSocial.claimantName
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
    return helpSocials.map((helpSocial, index) => (
      <div className='card' key={index}>
        {helpSocial.image && (
          <div className='card-image-container'>
            <img src={convertImageToBase64(helpSocial.image)} className='card-image' alt='Ayuda social' />
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
                  placeholder='Ingrese el nombre del reclamante'
                  value={helpSocial.claimantName || ''}
                  onChange={(event) => handleClaimantNameChange(index, event)}
                />
                <button onClick={() => handleShowForm(index)}>Guardar</button>
              </div>
            )}
            {helpSocial.showForm && (
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
          <p className='card-date'>Fecha actual: {currentDate}</p>
        </div>
      </div>
    ));
  };

  const convertImageToBase64 = (imageData) => {
    if (!imageData) {
      return null;
    }
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData.data)));
    return `data:${imageData.type};base64,${base64String}`;
  };

  return (
    <div className='container'>
      <h2 className='title'>
        <img src={icono} width={150} alt='Icono' />
        Ayudas Sociales
      </h2>

      {helpSocials.length > 0 ? (
        <div className='card-container'>{renderHelpSocials()}</div>
      ) : (
        <p className='no-data'>No hay ayudas sociales disponibles</p>
      )}
    </div>
  );
};


































