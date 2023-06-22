'use strict'

const express = require('express');
const app = express();
const {connection} = require("./src/database/connection");
require('dotenv').config;
const port = process.env.PORT;
const cors = require("cors");

const routesForum = require('./src/routes/forum.routes');
connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());

app.use('/api', routesForum);


app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})