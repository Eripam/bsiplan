const express=require('express');

const app = express();

//Importing Routes
const pdf = require('../Servicios/Estrategico/pdfServicios');

app.use('/reporte', pdf);

module.exports=app;