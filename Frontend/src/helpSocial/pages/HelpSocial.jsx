import React, {useEffect, useState} from "react"
import { HelpSocial } from "../components/HelpSocials";
import { AddHelpSocial } from "../components/AddHelpSocial";
import { getHelpSocial } from "../api/helpSocials";

export const HelpSocials = () => {
    document.title = "Ayuda Social";

    const [helpSocials, setHelpSocials] = useState(null);
    
    useEffect(() => {
        getHelpSocial().then((helpSocials) => setHelpSocials(helpSocials));
    }, []);

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
        <div className="container d-flex flex-column mt-4">
            <div>
                <button
                className="btn btn-primary ms-1 col-2 button-AddHelpSocial"
                onClick={() => setModalShow(true)}>
                    Agregar Ayuda Social
                </button>
            </div>
            {helpSocials == null && (
                <h2>No se han agregado ayudas sociales</h2>
            )}
        </div>
        <div>
            <AddHelpSocial show={modalShow} onHide={() => setModalShow(false)}
            sethelpSocials={setHelpSocials}
            />
                <div>
                {helpSocials && 
                helpSocials.map((helpSocial) => (
                    <div key={helpSocial._id}
                    className="col-sm-7 col-lg-5 d-flex align-self-center justify-content-center">
                    <HelpSocial>
                        key={HelpSocial._id}
                        _idHelpSocial={HelpSocial._id}
                        title={HelpSocial.title}
                        description={HelpSocial.description}
                        setHelpSocials={setHelpSocials}
                        helpSocials={HelpSocials}
                    </HelpSocial>
                    </div>
                ))}
                </div>
        </div>
        </>
    )

}





