const express=require('express');

const app = express();

//Importing Routes
const centralizada = require('../Rutas Externas/rutasCentralizada');
const usuariosRouter = require('../ServiciosWeb/swUsuarios');
const rolesRouter = require('../ServiciosWeb/swRoles');
const dependenciaRouter = require('../ServiciosWeb/swDependencia');
const rolpersonaRouter = require('../ServiciosWeb/swRolPersona');
const padreopcion = require('../ServiciosWeb/swPadreOpcion');
const opciones = require('../ServiciosWeb/swOpciones');

//Enlaces para acceder a los servicios
//Rutas Centralizada
app.use('/rutaCentalizada', centralizada);

//Ruta app
app.use('/usuario', usuariosRouter);
app.use('/rol', rolesRouter);
app.use('/dependencia', dependenciaRouter);
app.use('/rolpersona', rolpersonaRouter);
app.use('/padreop', padreopcion);
app.use('/opciones', opciones);

module.exports=app;