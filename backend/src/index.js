'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 3900;

var url = 'mongodb://localhost:27017/api_rest_mern_stack';

mongoose.Promise = global.Promise;

var article_routes = require('./routes/article');

//Se carga body-parser, midleware para analizar cuerpos atraves de la url
app.use(bodyParser.urlencoded({extended: false}));

//cualquier peticion la convertimos a json:
app.use(bodyParser.json());

//Activamos el cors para permitir peticiones AJAX y HTTP desde el Fronted
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-with, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api', article_routes);


mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log('conexion a la DB Realizada con Exito!!');
    app.listen(port, () =>{
        console.log('lanzando la aplicacion en el puerto ' + port);
    });
})