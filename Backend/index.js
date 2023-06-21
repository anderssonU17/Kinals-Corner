'use strict'

const express = require('express');
const app = express();
const {connection} = require("./src/database/connection");
require('dotenv').config;
const port = process.env.PORT;
const cors = require("cors");

const routesUser = require('./src/routes/user.routes')
const routesTeacher = require('./src/routes/teacher.routes')
connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());

app.use('/api', routesUser);
app.use('/api', routesTeacher);


app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})