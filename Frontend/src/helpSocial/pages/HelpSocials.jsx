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
      const response = await axios.patch('http://localhost:3002/api/update-helpSocial', {
        id: helpSocial._id,
        claimantName: helpSocial.claimantName,
      });

      if (response.status === 200) {
        console.log(`Nombre del reclamante actualizado para la ayuda social ${index}`);
        const updatedHelpSocials = [...helpSocials];
        updatedHelpSocials[index].claimed = true;
        setHelpSocials(updatedHelpSocials);
      }
    } catch (error) {
      console.log('Error al guardar el nombre del reclamante', error);
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

  const handleShowForm = (index) => {
    if (!helpSocials[index].claimed) {
      const updatedHelpSocials = [...helpSocials];
      updatedHelpSocials[index].showForm = true;
      setHelpSocials(updatedHelpSocials);
    }
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
