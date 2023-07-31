'use strict'

// const express = require('express');
const  {generateJWT} = require('../helpers/create-jwt');
const HelpSocial = require('../models/helpSocial.model'); // Asegúrate de importar correctamente el modelo HelpSocial
//Modulo nativo de node.js que permite interactuar con archivos del sistema.
const fs = require('fs')
//Modulo nativo de node.js que permite trabajar con rutas de archivos y directorios
const path = require('path')
const Stringify = require('querystring')

const createHelpSocials = async(req, res) => {
  try {
      const { title, description, claimantName, claimed } = req.body;

      if (!title || !description) {
          return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
      }

      // Check if claimantName is present, and set 'claimed' accordingly
      const isClaimed = !!claimantName;
      const newHelpSocial = new HelpSocial({ ...req.body, claimed: isClaimed });
      
      const helpSocial = await newHelpSocial.save();
      return res.status(201).json(helpSocial);

  } catch(err) {
      res.status(500).json({ error: 'Error al agregar la ayuda social' });
      console.log(err);
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
    const { claimed, claimantName } = req.body;

    // Realizar la actualización en la base de datos
    const helpSocial = await HelpSocial.findOneAndUpdate(
      { claimantName }, // Filtrar por claimantName
      { claimed: true, claimantName }, // Set claimed to true and add claimantName to the document
      { new: true, upsert: true } // Use upsert to insert the document if it doesn't exist
    );

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

//------------------------------------------------Manejo de imagenes------------------------------------------------------------
//Agregar imagen a una ayuda social

const addImageHelpSocial = async(req, res) => {
  try{
    const helpSocialId = req.body.helpSocialId;
    const image = req.body.image;

    if(!helpSocialId){
      return res.status(200).send({msg: "El parametro helpSocial Id es obligatorio"});
    }

    const helpSocialUpdate = await HelpSocial.findOneAndUpdate(
      {_id: helpSocialId},
      {image: image},
      {new: true}
      );

      if(!helpSocialUpdate){
        return res.status(204).json({msg: "No se encontro ayuda social"})
      }

      return res.status(204).json({
        msg: "Imagen agregada de forma correcta",
        helpSocialUpdate
      })

  }catch(err){

  }
}

  module.exports = {
    createHelpSocials,
    readHelpSocials,
    patchHelpSocial,
    deleteHelpSocial,
    addImageHelpSocial
  }



