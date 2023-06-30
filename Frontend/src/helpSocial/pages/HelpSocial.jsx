import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CreateHelpSocial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [claimDate, setClaimDate] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [helpSocials, setHelpSocials] = useState([]);

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleClaimedChange = (event) => {
    const newClaimed = event.target.checked;
    setClaimed(newClaimed);

    if (newClaimed && claimantName) {
      updateHelpSocial(newClaimed, claimantName);
    }
  };

  const handleClaimDateChange = (event) => {
    setClaimDate(event.target.value);
  };

  const handleClaimantNameChange = (event) => {
    const newClaimantName = event.target.value;
    setClaimantName(newClaimantName);

    if (claimed) {
      updateHelpSocial(claimed, newClaimantName);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/create-helpSocial', {
        title,
        description,
        image,
        claimed,
        claimDate,
        claimantName,
      });

      setSuccess(response.data.title + ' ha sido creado exitosamente');
      setError('');
      setTitle('');
      setDescription('');
      setImage('');
      setClaimed(false);
      setClaimDate('');
      setClaimantName('');

      fetchHelpSocials();
    } catch (error) {
      setError('Error al crear la ayuda social');
      console.log(error);
      setSuccess('');
    }
  };

  const updateHelpSocial = async (newClaimed, newClaimantName) => {
    try {
      const response = await axios.patch('http://localhost:3002/api/patch-helpSocial', {
        claimed: newClaimed,
        claimantName: newClaimantName,
      });

      console.log(response.data.message);
    } catch (error) {
      console.log('Error al actualizar la ayuda social', error);
    }
  };

  const handleClaimedToggle = async (currentClaimedStatus, index) => {
    try {
      const updatedHelpSocials = [...helpSocials];
      updatedHelpSocials[index].claimed = !currentClaimedStatus;
      setHelpSocials(updatedHelpSocials);

      const response = await axios.patch(
        `http://localhost:3002/api/update-helpSocial`,
        {
          claimed: !currentClaimedStatus,
          claimantName: updatedHelpSocials[index].claimantName,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.log('Error al actualizar la ayuda social', error);
    }
  };

  return (
    <div>
      <h2>Crear nueva ayuda social</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="text" value={image} onChange={handleImageChange} />
        </div>
        <div>
          <label>Reclamado:</label>
          <input type="checkbox" checked={claimed} onChange={handleClaimedChange} />
        </div>
        <div>
          <label>Fecha de reclamo:</label>
          <input type="date" value={claimDate} onChange={handleClaimDateChange} />
        </div>
        {claimed && (
          <div>
            <label>Nombre del reclamante:</label>
            <input type="text" value={claimantName} onChange={handleClaimantNameChange} />
          </div>
        )}
        <button type="submit">Crear</button>
      </form>
      <h2>Ayudas Sociales</h2>
      {helpSocials.length > 0 ? (
        <ul>
          {helpSocials.map((helpSocial, index) => (
            <li key={index}>
              <h3>{helpSocial.title}</h3>
              <p>{helpSocial.description}</p>
              <p>Imagen: {helpSocial.image}</p>
              <p>
                Reclamado:{' '}
                <span
                  className="claimed-toggle"
                  onClick={() => handleClaimedToggle(helpSocial.claimed, index)}
                >
                  {helpSocial.claimed ? 'Sí' : 'No'}
                </span>
              </p>
              <p>Fecha de reclamo: {helpSocial.claimDate}</p>
              {helpSocial.claimantName && <p>Nombre del reclamante: {helpSocial.claimantName}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay ayudas sociales disponibles</p>
      )}
    </div>
  );
};









