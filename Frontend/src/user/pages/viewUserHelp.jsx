import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SocialHelpsByUser() {
  const [socialHelps, setSocialHelps] = useState([]);
  const [error, setError] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [claimingHelpId, setClaimingHelpId] = useState(null);

  const getSocialHelpsByUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3002/api/listUserHelp', {
        headers: { 'token': token }
      });

      const socialHelpsData = response.data.socialHelps;
      setSocialHelps(socialHelpsData);
    } catch (error) {
      console.error(error);
      setError('Error del servidor');
    }
  };

  const handleClaimHelp = (id) => {
    setClaimantName(''); // Reset claimant name input
    setClaimingHelpId(id);
  };

  const handleSaveClaim = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        'http://localhost:3002/api/update-helpSocial',
        {
          id: claimingHelpId,
          claimantName
        },
        {
          headers: { 'token': token }
        }
      );

      // Update claimed status and claimant name locally
      setSocialHelps(prevSocialHelps =>
        prevSocialHelps.map(help =>
          help._id === claimingHelpId
            ? { ...help, claimed: true, claimantName }
            : help
        )
      );

      // Reset claimant name and claimingHelpId
      setClaimantName('');
      setClaimingHelpId(null);
    } catch (error) {
      console.error(error);
      setError('Error al reclamar la ayuda social');
    }
  };

  useEffect(() => {
    getSocialHelpsByUser();
  }, []);

  return (
    <div>
      <h1>Social Helps By User</h1>
      {error && <p>{error}</p>}
      <ul>
        {socialHelps.map((socialHelp) => (
          <li key={socialHelp._id}>
            <h2>{socialHelp.title}</h2>
            <p>{socialHelp.description}</p>
            <p>Image: {socialHelp.image}</p>
            <p>Claimed: {socialHelp.claimed ? 'Yes' : 'No'}</p>
            {socialHelp.claimed && <p>Claimant Name: {socialHelp.claimantName}</p>}
            <p>Claim Date: {new Date(socialHelp.claimDate).toLocaleString()}</p>
            {!socialHelp.claimed ? (
              <>
                {claimingHelpId === socialHelp._id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Claimant Name"
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                    />
                    <button onClick={handleSaveClaim}>Save Claim</button>
                  </div>
                ) : (
                  <button onClick={() => handleClaimHelp(socialHelp._id)}>Claim Help</button>
                )}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialHelpsByUser;
