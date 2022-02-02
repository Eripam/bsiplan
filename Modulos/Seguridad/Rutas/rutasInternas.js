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
const rolopcion= require('../ServiciosWeb/swRolOpcion');
const reglamento = require('../ServiciosWeb/swReglamento');
const regOpcion= require('../ServiciosWeb/swRegOpcion');

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
app.use('/rolopcion', rolopcion);
app.use('/reglamento', reglamento);
app.use('/regopc', regOpcion);

module.exports=app;