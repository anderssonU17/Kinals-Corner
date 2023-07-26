'use strict'

// const express = require('express');
const  {generateJWT} = require('../helpers/create-jwt');
const HelpSocial = require('../models/helpSocial.model'); // Asegúrate de importar correctamente el modelo HelpSocial
//Modulo nativo de node.js que permite interactuar con archivos del sistema.
const fs = require('fs')
//Modulo nativo de node.js que permite trabajar con rutas de archivos y directorios
const path = require('path')
const Stringify = require('querystring')


const createHelpSocials = async (req, res) => {
  try {
    let newHelpSocial = HelpSocial(req.body)
    const titleExist = await HelpSocial.findOne({title: newHelpSocial.title})

    if (req.body.claimantName) {
      newHelpSocial.claimed = true;
    } else {
      newHelpSocial.claimed = false;
    }

    if(titleExist){
      return res.status(404).json({msg: "Este titulo ya esta en uso"})
    }

    newHelpSocial = await newHelpSocial.save();

    if(!newHelpSocial){
      return res.status(404).json({msg: "La ayuda social no se a logrado crear :("})
    }else{
      return res.status(200).json({msg: "Ayuda social exitosa", newHelpSocial})
    }

  } catch (error) {
    res.status(500).json({ message: 'Error al crear la ayuda social', error: error.message });
  }
};



//------------------------------------------------------read help Social----------------------------------------------

const readHelpSocials = async (req, res) => {
    try {
        const helpSocials = await HelpSocial.find({});

        if(!helpSocials){
            return res.status(404).json({
                errr: "No hay ayudas sociales disponibles"
            })
        }

        res.json(helpSocials);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ayudas sociales' });
    }
  };

//------------------------------------------------------update help Social--------------------------------------------
const patchHelpSocial = async (req, res) => {
  const helpSocialId = req.params.id;
  const { claimantName } = req.body;

  try {
    // Buscar la ayuda social por ID en la base de datos
    const helpSocial = await HelpSocial.findById(helpSocialId);

    // Verificar si la ayuda social existe
    if (!helpSocial) {
      return res.status(404).json({ error: 'Ayuda social no encontrada' });
    }

    // Actualizar el nombre del reclamante
    helpSocial.claimantName = claimantName;

    // Guardar los cambios en la base de datos
    await helpSocial.save();

    // Enviar la respuesta con éxito
    res.json({ message: 'Nombre del reclamante actualizado correctamente' });
  } catch (error) {
    console.log('Error al actualizar el nombre del reclamante', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el nombre del reclamante' });
  }
};
//-------------------------------------------------------delete Help Social------------------------------------------------------

const deleteHelpSocial = async(req, res) => {
    try{

        const token = req.header('x-auth-token');
        const decoded = generateJWT(token);
        const helpSocialD = req.body;

        const deleteH = await HelpSocial.findOneAndDelete(helpSocialD);

        if(!decoded){
            res.status(404).send({
                msg: "El token que ingresaste es invalido"
            });
        }

        res.status(200).send({
            msg: "La ayuda social se elimino de forma correcta",
            eliminate: deleteH
        })

    }catch(err){
        res.status(404).send({message: 'error en la peticion para eliminar la ayuda social'});
        throw new Error('ocurrio un error al eliminar'); 
    }
}

//---------------------------------------Manejo de imagenes------------------------------------------------

const addImageHelpSocial = async (req, res) => {
  try{
    const helpSocialId = req.body.helpSocialId;
    const image = req.body.image;

    if(!helpSocialId) {
      return res.status(404).json({msg: "El parametro helpSocialId es necesario"})
    }

    const helpSocialUpdate = await HelpSocial.findOneAndUpdate(
      {_id: helpSocialId},
      {image: image},
      {new: true}
    );

    if(!helpSocialUpdate){
      return res.status(404).json({msg: "No se encontro la ayuda social"})
    }

    return res.status(200).json({msg: "Imagen agregada de forma correcta", helpSocialUpdate})

  }catch(error){
    console.log(error)
  }
}


// const addImageHelpSocial = async(req, res) =>{
//   try{
//     const helpSocialId = req.body.helpSocialId;
    
//     if(!helpSocialId){
//       return res.status(404).json({msg: "El parametro helpSocialId es obligatorio"})
//     }

//     const alreadyImageHelpSocial = await HelpSocial.findOne({id: helpSocialId})

//     let pathFile = './uploads/teachers/';

//     if(!req.files || !req.files.image || !req.files.image.type){
//       return res.status(400).json({msg: "No se a enviado ninguna imagen"});
//     }

//     const filePath = req.files.image.path; // \uploads\teachers\teacherName.png
//     const fileSpit = filePath.split('\\') // Va guardar un arreglo de String cada que encuente una jererquia
//     const fileName = fileSpit[fileSpit.length -1] //En la posicion 2 por que esa es la posicion en el arreglo donde se guarda el nombre de la imagen

//     if(fileExtension == 'png' ||
//     fileExtension == 'jpg' ||
//     fileExtension == 'jpeg' ||
//     fileExtension == 'gif'
//     ){
//       if(alreadyImageHelpSocial.image) fs.unlinkSync(pathFile + alreadyImageHelpSocial.image)

//       const helpSocialUpdate = await HelpSocial.findOneAndUpdate(
//         {_id: helpSocialId},
//         {image: fileName},
//         {new: true})

//         if(!helpSocialUpdate){
//           return res.status(404).json({msg: "No se encontro ayuda social y no se agrego imagen"});
//         }else{
//           return res.status(404).json({msg: "Imagen agreaga de forma correcta", helpSocialUpdate})
//         }
//     }

//     fs.lutimesSync(filePath);
//     return res.status(404).json({nsg: 'La extension del archivo no es admitida'})

//   }catch(err){
//     console.log("No se logro agregar la imagen", err)
//   }
// }

//Obtener la foto de un profesor

// const getImageHelpSocial = async(req, res) =>{
//   try{

//     const helpSocialId = req.params.helpSocialId;

//     if(!helpSocialId || helpSocialId == ''){
//       return res.status(404).json({msg: 'El parametro helpSocialId es obligatorio'})
//     }

//     const helpSocialFind = await HelpSocial.findOne({_id: helpSocialId});

//     if(!helpSocialFind){
//       return res.status(404).json({msg: "No se encontro ayuda social"}); 
//     }

//     const fileName = helpSocialFind.image;
//     const pathFile = './upload/teachers/' + fileName
//     const photo = fs.existsSync(pathFile)

//     if(!photo){
//       return res.status(404).json({msg: "No se encontro imagen"})
//     } 

//     return res.status(200).sendFile(path.resolve(pathFile))

//   }catch(err){
//     console.log("No se logro resivir la imagen" + err)
//   }
// }




  module.exports = {
    createHelpSocials,
    readHelpSocials,
    patchHelpSocial,
    deleteHelpSocial,
    addImageHelpSocial,
    getImageHelpSocial
  }



