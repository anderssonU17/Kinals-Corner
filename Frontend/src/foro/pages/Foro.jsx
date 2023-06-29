import {useState} from 'react'
import { Publicacion } from "./Publicacion";
import "../../assets/styles/Foro.css"
import { createForum } from '../api/ApiForo';
export const Foro = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const publicar = async(e) => {
    e.preventDefault()
    const result = await createForum(title, content)
  }
  


  const addTask = () => {
    if (title && description) {
      const newTask = { title, description };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
      setContent('');
    }
  };
  
  return (
    <> 
    
      <div className="mx-auto" >
      <h2 > Foro</h2>
    <hr />
    
    
    <div className="mensageSaliente">
      
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
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          className="form-control description"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />
        <button onClick={publicar}>Publicar</button>
      </div>
    </div>
    <div className="mb-3">
            {<Publicacion/>}
    </div>
    </div>
    {/* se volvio a organizar los componentes y se elimino el ul*/}
    </>
  )
}
