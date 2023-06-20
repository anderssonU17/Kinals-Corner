'use strict'

const {Router} = require("express");
const { createUser, readUser, updateUser, deleteUser, loginUser } = require("../controllers/user.controller");
const api = Router();

api.post('/create-user', createUser);
api.get('/list-user', readUser);
api.put('/update-user/:id', updateUser);
api.delete('/delete-user', deleteUser);
api.post('/login', loginUser);

module.exports = api;