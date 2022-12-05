const express=require('express');

const app = express();

//Importing Routes
const feval = require('../ServicioWeb/swFechasEvaluacion');

//Ruta app
app.use('/fechas', feval);

module.exports=app;