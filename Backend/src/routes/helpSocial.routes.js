'use strict'

const {Router} = require("express");
const multer = require('multer')
const connectMultiparty  = require('connect-multiparty')
const updload = connectMultiparty ({uploadDir: './uploads/helpSocial'})

const { createHelpSocials, updateHelpSocial, patchHelpSocial, readHelpSocials, deleteHelpSocial, addImageHelpSocial, getImageHelpSocial} = require("../controller/helpSocial.controller");
const api = Router();


// crear ayuda social
api.post('/create-helpSocial',createHelpSocials);
// actualizar nombre reclamante
api.patch('/update-helpSocial', patchHelpSocial);
// listar todas las ayudas sociales
api.get('/read-helpSocial', readHelpSocials);
// eliminar ayuda social
api.delete('/delete-helpSocial', deleteHelpSocial);
//Acualizar y guardar iamgen de una ayuda social CREADO
api.put('/addImageHelpSocial', addImageHelpSocial)
// api.get('/getImageHelpSocial/:helpSocialId', [updload], getImageHelpSocial)
module.exports = api;