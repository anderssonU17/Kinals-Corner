import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SocialHelpsByUser() {
  const [helpSocials, setHelpSocials] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [claimed, setClaimed] = useState(false);

  const fetchHelpSocials = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/read-helpSocial');
      const helpSocialsData = response.data;

      setHelpSocials(helpSocialsData);
    } catch (error) {
      console.error(error);
      setError('Error al obtener las ayudas sociales');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/create-helpSocial', {
        token: localStorage.getItem('token'), // Retrieve token from localStorage
        title,
        description,
        claimantName,
        claimed
      });

      console.log(response.data);

      // Clear the form
      setTitle('');
      setDescription('');
      setClaimantName('');
      setClaimed(false);

      fetchHelpSocials();
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error al crear la ayuda social');
    }
  };

  useEffect(() => {
    fetchHelpSocials();
  }, []);

  return (
    <div>
      <h1>Social Help List</h1>
      {error && <p>{error}</p>}
      <ul>
        {helpSocials.map((helpSocial) => (
          <li key={helpSocial._id} className='card'>
            <h2>{helpSocial.title}</h2>
            <p>{helpSocial.description}</p>
            <p>Image: {helpSocial.image}</p>
            <p>Claimed: {helpSocial.claimed ? 'Yes' : 'No'}</p>
            {helpSocial.claimed && <p>Claimant Name: {helpSocial.claimantName}</p>}
            <p>Claim Date: {new Date(helpSocial.claimDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Help Social</h2>
        <form onSubmit={handleSubmit}>
          {/* Remove token input */}
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          {/* <label>Claimant Name:</label>
          <input type="text" value={claimantName} onChange={(e) => setClaimantName(e.target.value)} />
          <label>Claimed:</label>
          <input type="checkbox" checked={claimed} onChange={(e) => setClaimed(e.target.checked)} /> */}
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default SocialHelpsByUser;

