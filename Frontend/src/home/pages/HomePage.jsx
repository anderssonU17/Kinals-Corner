import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/HomePage.css'
import pet from "../../assets/image/KinalinA.png"

export const HomePage = () => {
    const navigate = useNavigate();

    const onLogin = () =>{
        navigate("/login",{
            replace: true
        })
    }

    const onRegister = () =>{
        navigate("/register",{
            replace: true
        })
    }
  return (
    <>
        <div className='container-home'>
            <div className='container-home-center'>
                    <div className='container-home-item'>
                            <label className='label-home'>Bienvenido a Kinal's Corner</label>          
                                <hr />      
                            <img className='img-home container-home-img' src={pet}/>
                        <div className='container-home-item'>
                            <button 
                            className='button-home'
                            onClick={onRegister}>
                                ¿No tienes cuenta? <br />
                                Registrate
                            </button>
                                <br />
                            <label> ó </label>
                                <br />
                            <button 
                            className='button-home-login'
                            onClick={onLogin}>
                                Inicia sesion
                            </button>
                        </div>    
                    </div>
            </div>
        </div>
    </>
  )
}
