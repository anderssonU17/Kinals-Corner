'use strict'

// const express = require('express');
const  {generateJWT} = require('../helpers/create-jwt');
const HelpSocial = require('../models/helpSocial.model');
const User = require('../models/user.model')
const jwt_decode = require('jwt-decode')

//-------------------------------------create help Social----------------------------------------------------

const createHelpSocials = async(req, res) => {

  const token = req.headers['x-token'];  

try{

    const decodedToken = jwt_decode(token)

    const userId = decodedToken.uId;

    const user = await User.findById(userId)

    const { title, description, image } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
    }

    const newHelpSocial = new HelpSocial({
      user: user._id,
      title,
      description
    });
    const helpSocial = await newHelpSocial.save();
    res.status(201).json(helpSocial);

}catch(err){
    res.status(500).json({ error: 'Error al agregar la ayuda social' });
    console.log(err)
    }   
}

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
    try {
      const token = req.header('x-auth-token'); // Obtener el token del encabezado
      const decoded = generateJWT(token); // Verificar y decodificar el token
      
      const { claimed, claimantName } = req.body;
      
      // Realizar la actualización en la base de datos
      const helpSocial = await HelpSocial.findOneAndUpdate(
        { claimantName: decoded.name }, // Filtrar por claimantName
        { claimed, claimantName },
        { new: true }
      );
      
      if (!helpSocial) {
        return res.status(404).json({ message: "No se encontró la ayuda social para el usuario" });
      }
      
      return res.status(200).json({ message: "Ayuda social actualizada correctamente", helpSocial });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en la actualización de la ayuda social" });
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
    deleteHelpSocial,
  }



