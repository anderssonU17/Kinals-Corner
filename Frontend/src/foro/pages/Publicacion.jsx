import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../../assets/styles/Publicacion.css'
import { readForum, updateForumLikes } from "../api/ApiForo";

export const Publicacion = ({ tasks }) => {
    const [publicacion, setPublicacion] = useState([]);
<<<<<<< HEAD
     //array dentro de donde estan almacenados los comentarios, dando lugar a que estos se puedan mostrar o no
     const [mostrarComentario, setMostrarComentario] = useState([]);
     //valor del comentario
     const [comentario, setComentario] = useState('');
=======

    const handleLikeClick = async (index) => {
        try {
            const post = publicacion[index];
            const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
      // Llamamos a la API para actualizar los "likes" en el backend
            await updateForumLikes(post._id, newLikes);
      // Actualizamos localmente el estado de "likes" y "isLiked" en la publicación
            setPublicacion((prevPublicacion) => {
            const updatedPublicacion = prevPublicacion.map((p, i) => {
                if (i === index) {
                    return {
                    ...p,
                    likes: newLikes,
                    isLiked: !post.isLiked,
                    };
                }
        return p;
        });
        return updatedPublicacion;
    });
    } catch (error) {
        console.error('Error al actualizar el like:', error.message);
    }
};
>>>>>>> origin/main

    useEffect(() => {
        const fetchData = async () => {
            const result = await readForum();
            // Añadimos la propiedad "isLiked" a cada publicación
            const updatedResult = result.map((post) => ({ ...post, isLiked: false }));
            setPublicacion(updatedResult);
    };
    fetchData();
    }, [tasks]);

<<<<<<< HEAD
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
        try {
            const post = publicacion[index];
            const nuevoComentario = comentario;
            const newComment = await addComment(post._id, nuevoComentario);
            setComentario('');
          } catch (error) {
           console.error('Error al agregar el comentario:', error.message)
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
                         {publicacionActual.comments.map(comentarios => (
                             <p key={comentarios.id}>{comentarios.comment}</p>
                         ))};
                         <input 
                             type="text"
                             placeholder="Escribe un comentario"
                             value={comentario}
                             onChange={(e) => setComentario(e.target.value)}
                         />
                         <button onClick={() => agregarComentario(publicacionActual.id)}>Agregar Comentario</button>
                    </div>
                    )}

                </div>
            ))}
            </div>
        </>
    );
=======
return (
    <>
        <div>
            {publicacion?.map((publicacionActual, index) => (
            <div key={publicacionActual._id}>
            <h5>{publicacionActual.title}</h5>
            <p>{publicacionActual.content}</p>
            <button
                className={`like-button ${publicacionActual.isLiked ? "liked" : ""}`}
                onClick={() => handleLikeClick(index)}
            >
                <FontAwesomeIcon icon={faFire} />
            </button>
            <span className="likes-count">{publicacionActual.likes}</span>
        </div>
        ))}
    </div>
    </>
);
>>>>>>> origin/main
};
