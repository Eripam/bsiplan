const express=require('express');

const app = express();

//Importing Routes
const plan = require('../ServiciosWeb/swPlanes');

//Ruta app
app.use('/planes', plan);

module.exports=app;