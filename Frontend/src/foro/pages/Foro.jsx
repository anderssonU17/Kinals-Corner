import React, { useState, useEffect } from 'react';
import { Publicacion } from './Publicacion';
import '../../assets/styles/Foro.css';
import { createForum } from '../api/ApiForo';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Link } from 'react-router-dom';


export const Foro = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const publicar = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") { {/* verifica si algun input esta vacio, para no permitir hacer la publicacion */}
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa ambos campos antes de publicar',
      });
      return;
    }
    try {
      const result = await createForum(title, content);
      setTasks((prevTasks) => [...prevTasks, result]); // Agregar la nueva publicación al estado
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error al publicar:', error);
    }
  };

  return (
    <>
    <div className='mapa-div'>
          Algo mas
        </div>
    <div className='main-container'>
        <div className="MainDiv">
          <h2>Foro</h2>
          
          <div className="form">
            <div className="input-group col-auto">
              <input
                type="text"
                name="title"
                placeholder="Título"
                className="form-control input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                className="form-control description input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button className='button' onClick={publicar}>Publicar</button>
            </div>
          </div>

          <hr />

          <div className="mensageSaliente postDiv">
              mensaje
          </div>
          <hr />


          <div className="mb-3">
            <Publicacion tasks={tasks} /> {/* Pasar el estado tasks a Publicacion */}
          </div>
          <hr />
        </div>
        
        <div className='mapa-div'>
          mapa
        </div>
      </div>
      </>
  );
};
