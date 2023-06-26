import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // para descargar la libreria yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../../assets/styles/Publicacion.css'
import { readForum } from "../api/ApiForo";

export const Publicacion = () => {
const [publicacion, setPublicacion] = useState([]);
const [likesCount, setLikesCount] = useState(0);
const [isLiked, setIsLiked] = useState(false);

    useEffect (() =>{           // se manda a llamar al api de mostrar publicacion
        const fetchData = async () =>{
            const result = await readForum()
            setPublicacion(result)
        }
        fetchData()
    }, [])

const handleLikeClick = () => {
    if (isLiked) {
    setLikesCount(likesCount - 1);
    } else {
    setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
};
    
return (
    <>
        <div>
            {publicacion?.map((publicacionActual) => (
                <div key={publicacionActual._id}>
                    <h5>{publicacionActual.title}</h5>
                    <p>{publicacionActual.content}</p>
                    <button
                        className={`like-button ${isLiked ? "liked" : ""}`}
                        onClick={handleLikeClick}
                    >
                        <FontAwesomeIcon icon={faFire} />
                    </button>
                    <span className="likes-count">{likesCount}</span>
                </div>
            ))}
        </div>
    </>
);

};
