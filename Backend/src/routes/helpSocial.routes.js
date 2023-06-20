'use strict'

const {Router} = require("express");
const { createHelpSocials, updateHelpSocial, patchHelpSocial, readHelpSocials, deleteHelpSocial} = require("../controller/helpSocial.controller");
const api = Router();

api.post('/create-helpSocial', createHelpSocials);
api.patch('/update-helpSocial', patchHelpSocial);
api.get('/read-helpSocial', readHelpSocials);
api.delete('/delete-helpSocial', deleteHelpSocial);
module.exports = api;