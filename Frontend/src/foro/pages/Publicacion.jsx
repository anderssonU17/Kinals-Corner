import React, { useEffect, useState } from "react";
import { Foro } from "./Foro";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // para descargar la libreria yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../css/Publicacion.css'

export const Publicacion = () => {
const [publicacion, setPublicacion] = useState([]);
const [likesCount, setLikesCount] = useState(0);
const [isLiked, setIsLiked] = useState(false);

const getForum = async()=>{
    try {
        const {data} = await axios("http://localhost:3000/api/read-forum")
        console.log(data)
        if (data.publicacion) {
            setPublicacion([...publicacion, ...data.publicacion]);
        }
    } catch (err) {
         console.error(err);
    }
} 
{/*Recarga cada vez que se realiza un cambio */}
useEffect(() =>{
    getForum()
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
        
        <div>
            {/* se mandan a buscar las publicaciones*/}
            {publicacion.map((publicacion) => (
                <div key={publicacion._id}>
                    {/* se trae el titulo, descripcion y nombre de usuario de quien lo escribe o publica*/}
                    <h2>{publicacion.title}</h2>
                    <p>{publicacion.content}</p>
                    <p>{publicacion.name}</p>
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
                <Foro setPublicacion={setPublicacion} publicacion={publicacion}></Foro>
    </div>
    </>
);
};

 {/*
        prototipo ejemplo de parte de teja
        <div>
        <img src="" alt="" />
        <label htmlFor="">NOMBRE USER</label>
        <p>añldjsaldjsadklasjfakcnascslacaslkcnascaslcslakcasncsalcasklcnss</p>
        <button
                className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLikeClick}
        >
            <FontAwesomeIcon icon={faFire} />
        </button>
        <span className="likes-count">{likesCount}</span>
        </div>
    </div> */}