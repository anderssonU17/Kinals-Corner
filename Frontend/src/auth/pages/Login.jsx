import React, { useState } from 'react'
import { login } from '../api/ApiLogin';
import Swal from 'sweetalert2';
import "../../assets/styles/index.css"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = async (e) =>{
        e.preventDefault();
        const result = await login(email, password);
        if(result){
            Swal.fire({
                icon: "success",
                title: "Genial!",
                text: "Ha iniciado sesión correctamente!",
                confirmButtonText: "Ok",
            }).then(r =>{
                if(r.isConfirmed){
                    window.location.href = "/";
                } else {
                    window.location.href = "/";
                }
            });
        }
    };

return (
    <>
        <form>      
            <img src="https://o.remove.bg/downloads/7a3c6b9d-6e83-46ca-9731-f7e6524a5c88/Logo_05-removebg-preview-removebg-preview.png" alt="" /> <p></p><p></p>
            <img className='letrasL' src="https://o.remove.bg/downloads/2ae0c825-e4f8-4104-ad1a-fb20a75131e4/Logo_txt_2-removebg-preview.png" alt="" />

            <div className="mb-3">
                <label className='form-label text-black'>Correo Electronico</label>
                <input value={email} onChange={({target: {value}}) => setEmail(value)} type="email" className='form-control' id='email' required/>
                <div>
                    <div className='mb-3'>
                        <label className='form-label text-black'>Contraseña</label>
                        <input value={password} onChange={({target: {value}}) => setPassword(value)} type="password" className='form-control' id='password' required/>
                    </div>
                    <button type='submit' onClick={(e) => iniciarSesion(e)} className='btn btn-primary'>Iniciar Sesión</button>
                </div>
            </div>
        </form>
    </>
  )
}