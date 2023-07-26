import { useEffect, useState } from "react";
import React from "react";

export const HelpSocial = ({
    _idHelpSocial,
    title,
    description
}) => {
    
    const [image, setImage] = useState(
        `http://localhost:3002/api/getImageHelpSocial/${_idHelpSocial}`
    );

    return (
        <>
            <div>
                <div>
                    <img src={image} style={{height: 100, width: 100, borderRadius: 50}}/>
                    <div>
                        <p>Titulo:</p>
                        <h6>{title}</h6>
                        <p>Description:</p>
                        <h6>{description}</h6>
                    </div>
                </div>
            </div>
        </>
    )

}




