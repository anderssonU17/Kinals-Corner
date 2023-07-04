import '../../assets/styles/register.css'
import logo from "../../assets/image/LogoHd.png"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { createUser } from '../api/ApiRegister'

export const  Register= () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [errors, setErrors] = useState({})

  const imprimir = async (e) => {
    e.preventDefault();
  
    setErrors({})

    const newErrors = {}

    if (name === '') {  {/* si el campo se encuentra vacio dara error antes de mandar el post */}
      newErrors.name = 'Por favor, ingresa tu nombre'
    }

    if (email === '') {
      newErrors.email = 'Por favor, ingresa tu correo'
    } else if (!email.endsWith('@kinal.edu.gt') && !email.endsWith('@kinal.org.gt')) { [/*en caso de que el correo no sea de kinal mostrara error antes de enviar el post */]
      newErrors.email = 'El correo debe ser institucional'
    }

    if (password === '') {
      newErrors.password = 'Por favor, ingresa tu contraseña'
    } else if (password.length < 8) { {/* en caso de que la contraseña sea menor a 8 caracteres mostrara error antes de mandar el post */}
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }


    const result = await createUser(name,email, password); {/*se manda a llamar al api */}
    if (result) {   {/* alerta por si la creacion se dio correctamente */}
      Swal.fire({
        icon: 'success',
        title: "Genial",
        text: "Se ha creado el usuario correctamente",
        confirmButtonText: "Ok"
      }).then((r) => {
        if (r.isConfirmed) {
          navigate('/');
        } else {
          navigate('/');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "No se pudo crear el usuario",
        confirmButtonText: "Ok"
      });
    }
  };

  return (
    <>
      <div className='container container-center'>
        <div className='container-center'>
            <div className="container-centers">
              <img src={logo} className='image'/>                
                <h1 className='container-center'>
                  Registrarse
                </h1>
            </div>
        </div> 
            <div className="container-center">  {/*se agrego que los campos sean requeridos */}
              <form action="imprimir">
              <input className={`input ${errors.name && 'input-error'}`}
                type="text"
                placeholder='Nombre'
                required
                value={name}
                onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className='error-message'>{errors.name}</p>}
                    <br /> {/* se borro apelido porque no es un campo a solocitar */}
              <input className={`input ${errors.email && 'input-error'}`}
              type="email" 
              placeholder='Correo' 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} /> 
                {errors.email && <p className='error-message'>{errors.email}</p>} {/*se le dio valor a cada input */}
                  <br />
              <input className={`input ${errors.password && 'input-error'}`}
              type="password" 
              placeholder='Contraseña' 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <p className='error-message'>{errors.password}</p>} {/* este texto se mostrara en caso de haber error */}
                <br />

              <div className='container-right'>
                  <button className='btn' onClick={imprimir} >Registrarse</button> {/* se agrego la accion de registrar */}
              </div>
              </form>
            </div>
      </div>
    </>
  )
}
