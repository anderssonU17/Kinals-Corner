import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // para descargar la libreria yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { faFire } from "@fortawesome/free-solid-svg-icons";


export const Publicacion = () => {
const [publicacion, setPublicacion] = useState([]);
const [likesCount, setLikesCount] = useState(0);
const [isLiked, setIsLiked] = useState(false);

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
        <img src="" alt="" />
        <label htmlFor="">NOMBRE USER</label>
        <p>añldjsaldjsadklasjfakcnascslacaslkcnascaslcslakcasncsalcasklcnss</p>
        <button
            
            onClick={handleLikeClick}
        >
            <FontAwesomeIcon icon={faFire} />
        </button>
        <span className="likes-count">{likesCount}</span>
        </div>
    </div>
    </>
);
};
