const express=require('express');

const app = express();

//Importing Routes
const prospectiva = require('../ServiciosWeb/swProspectiva');

//Ruta app
app.use('/prospectiva', prospectiva);

module.exports=app;