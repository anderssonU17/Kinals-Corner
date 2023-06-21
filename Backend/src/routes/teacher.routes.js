'use strict'

const {Router} = require('express');
const api = Router();

const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParams} = require('../middlewares/validate-params');
const {check} = require('express-validator');

//Importar connect-multiparty, luego hacer una instancia y enviarle el directorio donde se guardaran los archivos
const connetMultiparty = require('connect-multiparty')
const updload = connetMultiparty({uploadDir: './uploads/teachers'})

const {createTeacher, addImageTeacher} = require('../controller/teacher.controller');

//********************* */ Endpoints
// Crear profesor
api.post('/addTeacher', createTeacher)

//Actualizar y guardar imagen de un profesor CREADO
api.put('/addImageTeacher', [updload], addImageTeacher)


module.exports = api