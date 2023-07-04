import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // para descargar la libreria yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../../assets/styles/Publicacion.css'
import { readForum } from "../api/ApiForo";

export const Publicacion = ({ tasks }) => {
    const [publicacion, setPublicacion] = useState([]);
     //array dentro de donde estan almacenados los comentarios, dando lugar a que estos se puedan mostrar o no
     const [mostrarComentario, setMostrarComentario] = useState([]);
     //valor del comentario
     const [comentario, setComentario] = useState('');

    useEffect(() => {
    const fetchData = async () => {
        const result = await readForum();
        setPublicacion(result);
    };
    fetchData();
    }, [tasks]);

    const handleLikeClick = (index) => {
        setPublicacion((prevPublicacion) => {
        const updatedPublicacion = [...prevPublicacion];
        const post = updatedPublicacion[index];
        if (post.isLiked) {
            post.likesCount -= 1;
        } else {
            post.likesCount += 1;
        }
        post.isLiked = !post.isLiked;
        return updatedPublicacion;
    });
    };

    // funcion que alterna entre los comentarios que se realizan, mostrar y no hacerlo
    const toggleComments = (id) => {
        setMostrarComentario((prevMostrarComentario) => ({
            ...prevMostrarComentario,
            [id]: !prevMostrarComentario[id]
        }));
    };

    //función para agregar los comentarios
    const agregarComentario = async(index) =>{
        if (comentario.trim() !=='') {
            const dataComent = await addComment(index, comentario);
            setPublicacion((prevPublicacion) => 
             [...prevPublicacion, dataComent]
            );
            setComentario('')
        }
    }

    return (
        <>
            <div>
            {publicacion?.map((publicacionActual, index) => (
                <div key={publicacionActual._id}>
                <h5>{publicacionActual.title}</h5>
                <p>{publicacionActual.content}</p>
                <button
                    className={`like-button ${
                    publicacionActual.isLiked ? "liked" : ""
                    }`}
                    onClick={() => handleLikeClick(index)}
                >
                    <FontAwesomeIcon icon={faFire} />
                </button>
                <span className="likes-count">{publicacionActual.likesCount}</span>
                <button onClick={()=> toggleComments(publicacionActual._id)}>
                    {mostrarComentario[publicacionActual._id] ? 'Comentarios' : 'Comentarios'}
                </button>
                    {mostrarComentario[publicacionActual._id] && (
                        <div>
                            {publicacionActual.comments.map(({comment, id}) => (
                                <p key={id}>{comment}</p>
                            ))}
                            <input 
                                type="text"
                                placeholder="Escribe un comentario"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                            <button onClick={() => agregarComentario(index)}>Agregar Comentario</button>
                            <button
                                className={`like-button ${
                                publicacionActual.isLiked ? "liked" : ""
                                }`}
                                onClick={() => handleLikeClick(index)}
                            >
                                <FontAwesomeIcon icon={faFire} />
                            </button>
                            
                            </div>
                    )}

                </div>
            ))}
            </div>
        </>
    );
};
