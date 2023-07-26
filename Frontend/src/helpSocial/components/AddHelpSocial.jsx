import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from "sweetalert2";
import { createHelpSocial, getHelpSocial } from "../api/helpSocials";

export const AddHelpSocial = (props) =>{
    const [titleHelpSocial, setTitleHelpSocial] = useState('');
    const [description, setDescription] = useState('')
    const [imageHelpSocial, setImageHelpSocial] = useState(null)

    const checkParameters = () => {
        if(titleHelpSocial.trim().length == 0 || description.trim().length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Campos vacios',
                text: 'Debes llenar todos los campos al agregar una ayuda social',
                showConfirmButton: true,
                confirmButtonText: 'oK',
                confirmButtonColor: 'tomato'
            })
            return false
        }else if(!imageHelpSocial){
            Swal.fire({
                icon: 'error',
                title: 'Sin imagen',
                text: 'Debes colocar una imagen',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: 'yellow'
            });
            return false
        }
        return true
    }

    const cancelAddHelpSocial = () => {
        setImageHelpSocial(null)
        setTitleHelpSocial('')
        setDescription('')
        props.onHide()
    }

    const clearStates = () => {
        setTitleHelpSocial('')
        setDescription('')
        setImageHelpSocial('')
    }

    const fetchCreateHelp = async() => {
        try{
            if(!checkParameters()) return
            const image = new FormData()
            image.append('image', image)

            await createHelpSocial(titleHelpSocial, description, imageHelpSocial).then(
                () => {
                    setTimeout(
                        () => {
                            getHelpSocial().then((helpSocials) => props.set_helpSocials(helpSocials));
                        },
                        1000
                    )
                }
            )

            clearStates();
            props.onHide();

        }catch(error){
            console.log(error);
        }
    }


return (
    <Modal {...props} size="lg"
    arial-labelledby="contained-modal-tile-vcenter">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Agregar Ayuda Social
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
            <h6>Datos para la ayuda social</h6>
            <div className="mb-3 col-8">
                <label className="form-label">TItulo</label>
                <input type="text" className="form-control" onChange={(e) => setTitleHelpSocial(e.target.value)}/>
                <label className="form-label">Descripcion:</label>
                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
            
                {/* Agregar Imagen */}
                <label className="form-label mt-2">Foto para la ayuda social</label>
                <div className="input-group mb-3">
                    <input type="file" className="form-control" 
                    onChange={(e) => setImageHelpSocial(e.target.files[0])
                    }/>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-succes" onClick={
                () => {
                    fetchCreateHelp()
                }
            }>AGREGAR</Button>
            <Button className="btn btn-danger" onClick={
                () => {
                    cancelAddHelpSocial()
                }
            }>Cancelar</Button>
        </Modal.Footer>
    </Modal>
    )
}




























// import '../../assets/styles/CreateHelpSocial.css'



