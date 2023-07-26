// api/helpSocial.js
import axios from 'axios';
import Swal from 'sweetalert2';
const URL = 'http://localhost:3002/api/';

export const createHelpSocial = async (title, description, image) => {
  try {
    let fileExtension = image.type + "";
    fileExtension = fileExtension.split("/").pop();

    if(fileExtension == "png" ||
    fileExtension == "jpg" ||
    fileExtension == "jpeg" ||
    fileExtension == "gif")
    {
      const data = {
        title: title,
        description: description,
      };

      const response = await axios.post(`${URL}create-helpSocial`, data);
      const newHelpSocial = response.data.newHelpSocial;

      addImageHelpSocial(newHelpSocial._id, image)

    }else{
      Swal.fire({
        icon: "info",
        title: "El tipo del archivo no es admitido",
        showCancelButton: true,
        confirmButtonColor: 'tomato',
      });
      return;
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.response.data.message,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
  }
};

export const addImageHelpSocial = async (helpSocialId, image, edit) => {
  try {
    const data = {
      helpSocialId: helpSocialId,
      image: image,
    }

    const response = await axios.put(`${URL}addImageHelpSocial`, data, {
      headers: { "Content-Type": "multiparty/form-data" },
    });

    if(response){
      Swal.fire({
        icon: "success",
        title: `${
          edit ? "Se edito correctamente al" : "Se agrego a"
        } ayuda social correctamente`,
        showCancelButton: true,
        confirmButtonColor: "#32FF00"
      });
    }

  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.msg,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
};

export const getHelpSocial = async () => {
  try {
    const response = await axios.get(`${URL}read-helpSocial`);
    return response.data.helpSocials;
  } catch (error) {
    console.error(error);
  }
};


