const express=require('express');

const app = express();

//Importing Routes
const plan = require('../ServiciosWeb/swPlanes');
const estructura = require('../ServiciosWeb/swEstructura');
const esplan = require('../ServiciosWeb/swEstructuraPlan');
const eje=require('../ServiciosWeb/swEje');
const cronograma=require('../ServiciosWeb/swCronograma');
const plannacional=require('../ServiciosWeb/swPlanNacional');
const archivo= require('../ServiciosWeb/swArchivosPlan');
const evaluacion=require('../Evaluacion/Rutas/rutasInternas');
const responsable = require('../ServiciosWeb/swResponsable');

//Ruta app
app.use('/plan', plan);
app.use('/estructura', estructura);
app.use('/estructurap', esplan);
app.use('/ejeE', eje);
app.use('/cronograma', cronograma);
app.use('/planN', plannacional);
app.use('/archivo', archivo);
app.use('/evaluacion', evaluacion);
app.use('/responsable', responsable);

module.exports=app;