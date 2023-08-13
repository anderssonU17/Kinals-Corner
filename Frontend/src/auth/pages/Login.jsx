// Login.js

import React from 'react';
import logo from '../../assets/image/LogoHd.png'; // Reemplaza con la ruta de tu logo
import microsoftLogo from '../../assets/image/microsoft.png'; // Reemplaza con la ruta del logo de Microsoft
import '../../assets/styles/login.css'; // Asegúrate de importar los estilos de tu archivo CSS

export const Login = () => {
  return (
    <div className="login-container">
      <div className="left-section">
        {/* Agrega la imagen de fondo */}
        <img className="background-image" />
      </div>

      <div className="right-section">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="main-title">
          El rincón de <br /> Confianza de Kinal
        </h1>
        <p className="sub-title">Únete a Kinals'Corner</p>

        <button className="microsoft-btn" onClick={() => {
          const popup = window.open(
            "http://localhost:3000/auth/microsoft", 
            "targetWindow", 
            `toolbar=no, 
              location=no,
              status=no, 
              menubar=no,
              scrollbars=yes,
              resizable=yes,
              width=620,
              height=700`
          );

          window.addEventListener("message", (event) => {
            if (event.origin === "http://localhost:3000") {
              if (event.data) {
                sessionStorage.setItem("user", JSON.stringify(event.data));
                popup.close();
              }
            }
          });

        }}
        >
          <img src={microsoftLogo} alt="Microsoft Logo" />
          Continue with Microsoft
        </button>

        <div className="divider">
          <span>o</span>
        </div>

        <button className="create-account-btn">Crear Cuenta</button>

        <p className="terms-policy">
          Al registrarte, estás de acuerdo con <br/>nuestras políticas y términos.
        </p>

        <p className="already-have-account">¿Ya tienes una cuenta?</p>
        <button className="login-btn">Iniciar Sesión</button>
      </div>
    </div>
  );
};
