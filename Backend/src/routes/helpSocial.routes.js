'use strict'

const {Router} = require("express");
const { createHelpSocials, updateHelpSocial, patchHelpSocial, readHelpSocials} = require("../controller/helpSocial.controller");
const api = Router();

api.post('/create-helpSocial', createHelpSocials);
api.patch('/update-helpSocial', patchHelpSocial);
api.get('/read-helpSocial', readHelpSocials)
module.exports = api;