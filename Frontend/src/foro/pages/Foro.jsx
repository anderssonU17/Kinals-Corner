import {useState} from 'react'
import axios from "axios"
import PropTypes from "prop-types"
import { Publicacion } from "./Publicacion";
import "../src/css/Foro.css"


export const Foro = ({publicacion, setPublicacion}) => {
  const [tasks, setTasks] = useState({});
  
  
{/*cada vez que ocurra un cambio en los inputs los colocara*/}
  const handleInputChange = (event) => {
    setTasks({
      ...tasks,
      [event.target.name]: event.target.value
    })
  };


  const addTask = async (e) => {
   try {
    e.preventDefault();
    let {data} = await axios.post('http://localhost:3000/api/create-forum', tasks);
    setPublicacion(
      [...publicacion, tasks]
    );
    setTasks({});
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <> 
    
      <div className="mx-auto" >
      <h2 >
        Foro</h2>
    <hr />
    
    <hr />

    <form onSubmit={(e) => addTask(e)}>

    <div className="form">
      <div className="input-group col-auto">
        <input
          type="text"
          id='title'
          name="title"
          placeholder="Título"
          className="form-control"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Descripción"
          className="form-control description"
          onChange={handleInputChange}
        />
        <button type='submit' onClick={addTask}>Publicar</button>
      </div>
    </div>
    </form>
    </div>

    </>
  )
}

Foro.propTypes = {
  publicacion: PropTypes.array.isRequired,
  setPublicacion: PropTypes.func.isRequired
}
