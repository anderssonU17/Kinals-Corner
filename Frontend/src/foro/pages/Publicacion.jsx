import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // para descargar la libreria yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../../assets/styles/Publicacion.css'
import { readForum } from "../api/ApiForo";

export const Publicacion = ({ tasks }) => {
    const [publicacion, setPublicacion] = useState([]);
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
                </div>
            ))}
            </div>
        </>
    );
};
