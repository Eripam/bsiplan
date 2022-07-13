const express=require('express');

const app = express();

//Importing Routes
const pdf = require('../Servicios/pdfServicios');

app.use('/pdf', pdf);

module.exports=app;