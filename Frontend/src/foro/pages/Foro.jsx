import {useState} from 'react'
import { Publicacion } from "./Publicacion";
import "../src/css/Foro.css"
export const Foro = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const addTask = () => {
    if (title && description) {
      const newTask = { title, description };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
    }
  };
  
  return (
    <> 
    
      <div className="mx-auto" >
      <h2 >
        Foro</h2>
    <hr />
    
    <div className="mb-3">
            <Publicacion></Publicacion>
    </div>
     <div className="mensageSaliente">
      <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <label for="floatingTextarea2" className="mensage1">Nombre Usuario</label>
                {/* Titulo y descripcion del mensage */}
                <h3 className="titulo">{task.title}</h3>
                <p className="descripcion">{task.description}</p>
              </li>
            ))}
          </ul>
     </div>
    
    <hr />
    <div className="form">
      <div className="input-group col-auto">
        <input
          type="text"
          name="title"
          placeholder="Título"
          className="form-control"
          value={title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          className="form-control description"
          value={description}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Publicar</button>
      </div>
    </div>
    </div>
    {/* <div>
            <Publicacion></Publicacion>
    </div> */}
    </>
  )
}