'use strict'

// const express = require('express');
const  {generateJWT} = require('../helpers/create-jwt');
const HelpSocial = require('../models/helpSocial.model'); // Asegúrate de importar correctamente el modelo HelpSocial

const createHelpSocials = async (req, res) => {
  const { title, description, claimDate, claimantName } = req.body;

  try {
    const image = req.files.image; // Obtener el archivo adjunto de la solicitud
    const iamgeBase64 = image.data.toString('base64');

    const claimed = claimantName ? true : false; // Verificar si se proporciona el nombre del reclamante

    const helpSocial = new HelpSocial({
      title,
      description,
      image: iamgeBase64, // Guardar solo el nombre de la imagen
      claimed,
      claimDate,
      claimantName
    });

    await helpSocial.save();

    res.status(201).json({ message: 'Ayuda social creada exitosamente', helpSocial });
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al crear la ayuda social' });
    console.log(error);
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

  module.exports = {
    createHelpSocials,
    readHelpSocials,
    patchHelpSocial,
    deleteHelpSocial
  }



