'use strict'

const { Router } = require("express");
const { check } = require("express-validator")
const { createUser, readUser, updateUser, deleteUser, loginUser } = require("../controller/user.controller");
const { validateParams } = require("../middlewares/validate-params");
const { validateJWT } = require("../middlewares/validate-jwt");
const { rolAdmin } = require("../middlewares/validate-rol");

const api = Router();

/* Ruta para creación del usuario */
api.post('/create-user', [
    check('name', 'El parametro name es necesario para la creación del usuario').not().isEmpty(),
    check('email', 'El parametro email es necesario para la creación del usuario').not().isEmpty(),
    check('email').custom(value => {
        if(!value.endsWith('@kinal.edu.gt') && !value.endsWith('@kinal.org.gt')){
            return res.status(404).json({message: "El parametro email debe ser de un profesor o estudiante"});
        }
        return true;
    }),
    check('password', 'El parametro password debe contar con 8 o más caracteres').isLength({min: 8}),
    validateParams
], createUser);


api.get('/list-user', readUser);

api.put('/update-user/:id', updateUser);

api.delete('/delete-user', deleteUser);

api.post('/login', loginUser);

module.exports = api;