'use strict'

const {Router} = require("express");
const { createHelpSocials, updateHelpSocial, patchHelpSocial, readHelpSocials, deleteHelpSocial, addImageHelpSocial} = require("../controller/helpSocial.controller");
const api = Router();

api.post('/create-helpSocial', createHelpSocials);
api.patch('/update-helpSocial/:id', patchHelpSocial);
api.get('/read-helpSocial', readHelpSocials);
api.delete('/delete-helpSocial', deleteHelpSocial);
api.put('addImageHelpSocial', addImageHelpSocial)
module.exports = api;