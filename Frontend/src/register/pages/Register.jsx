import "../../assets/styles/register.css";
import logo from "../../assets/image/LogoHd.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { createUser } from "../api/ApiRegister";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const imprimir = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};

    if (name === "") {
      {
        /* si el campo se encuentra vacio dara error antes de mandar el post */
      }
      newErrors.name = "Por favor, ingresa tu nombre";
    }

    if (email === "") {
      newErrors.email = "Por favor, ingresa tu correo";
    } else if (
      !email.endsWith("@kinal.edu.gt") &&
      !email.endsWith("@kinal.org.gt")
    ) {
      [
        /*en caso de que el correo no sea de kinal mostrara error antes de enviar el post */
      ];
      newErrors.email = "El correo debe ser institucional";
    }

    if (password === "") {
      newErrors.password = "Por favor, ingresa tu contraseña";
    } else if (password.length < 8) {
      {
        /* en caso de que la contraseña sea menor a 8 caracteres mostrara error antes de mandar el post */
      }
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await createUser(name, email, password);
    {
      /*se manda a llamar al api */
    }
    if (result) {
      {
        /* alerta por si la creacion se dio correctamente */
      }
      Swal.fire({
        icon: "success",
        title: "Genial",
        text: "Se ha creado el usuario correctamente",
        confirmButtonText: "Ok",
      }).then((r) => {
        if (r.isConfirmed) {
          navigate("/");
        } else {
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el usuario",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <div className="container-register">
        <form onSubmit={imprimir}>
          <div className="card-register">
            <div className="card-register-title">
              <center>
                <h2>Bienvenido al registro de usuarios</h2>
              </center>
              <center>
                <img src={logo} alt="logo" />
              </center>
            </div>
            <p>Ingrese los datos para crear una cuenta</p>
            <div className="content-register">
              <label>Nombres</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="content-register">
              <label>Email</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="content-register">
              <label>Contraseña</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Link>
            <div className="link-new-account">
              <center>
                <button onClick={(e) => imprimir(e)} type="submit" className="button"></button>
              </center>
            </div>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
