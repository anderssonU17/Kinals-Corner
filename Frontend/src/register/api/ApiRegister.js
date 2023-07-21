import axios from "axios"; {/*se agrego api para poder crear usuario */ }
import Swal from 'sweetalert2';
const URL = "http://localhost:3002/api/"

export const createUser = async (name, email, password) => {
    try {
        const usersave = await axios.post(`${URL}create-user`, {
            name: name,
            email: email,
            password: password,
        });
        
        Swal.fire({
            icon: "success",
            title: "¡Usuario creado correctamente!",
            showConfirmButton: true,
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "/login";
        });
        
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo guardar el usuario.",
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
    }
  };