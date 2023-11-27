const express=require('express');

const app = express();

//Importing Routes
const plan = require('../ServiciosWeb/swPlanes');
const estructura = require('../ServiciosWeb/swEstructura');
const estructuraPlan = require('../ServiciosWeb/swEstructuraPlan');

//Ruta app
app.use('/planes', plan);
app.use('/estructuraPlanes', estructura);
app.use('/estructuraPlanesDatos', estructuraPlan);

module.exports=app;