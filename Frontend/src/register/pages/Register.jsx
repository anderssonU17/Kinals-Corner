import "/src/register/assets/register.css"
import logo from "/src/assets/image/LogoHd.png"

export const  Register= () => {

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
            <div className="container-center row">
              <input className='input' type="text" placeholder='Nombres' /><br />
              
              <input className='input' type="text" placeholder='Apellidos' /><br />
              
              <input className='input' type="text" placeholder='Correo'/><br />
              
              <input className='input' type="password" placeholder='Contraseña'/><br />

              <div className='container-right row'>
                 <button className='btn'>Registrarse</button>
              </div>
            </div>
      </div>
    </>
  )
}
