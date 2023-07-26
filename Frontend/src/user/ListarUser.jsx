import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/list-user'); // Replace '/api/users' with the appropriate API endpoint to fetch users
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
      } else {
        console.error('Error fetching users:', data);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div>
      {usuarios.length === 0 ? (
        <p>No se encontraron usuarios</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario._id}>{usuario.name}</li> // Assuming each user object has a 'name' property
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;






