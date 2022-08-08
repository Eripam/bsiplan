const express=require('express');

const app = express();

//Importing Routes
const plan = require('../ServiciosWeb/swPlanes');
const estructura = require('../ServiciosWeb/swEstructura');
const esplan = require('../ServiciosWeb/swEstructuraPlan');
const eje=require('../ServiciosWeb/swEje');
const cronograma=require('../ServiciosWeb/swCronograma');

//Ruta app
app.use('/plan', plan);
app.use('/estructura', estructura);
app.use('/estructurap', esplan);
app.use('/ejeE', eje);
app.use('/cronograma', cronograma);

module.exports=app;