const express=require('express');

const app = express();

//Importing Routes
const prospectiva = require('../ServiciosWeb/swProspectiva');
const criterios=require('../ServiciosWeb/swCriterios');
const auditoria=require('../ServiciosWeb/swAuditoria');
const criteriodes=require('../ServiciosWeb/swCriterioDes');
const respuesta = require('../ServiciosWeb/swRespuesta');
const arbol = require('../ServiciosWeb/swArbol');
const correo = require('../../Correo/envioCorreo');

//Ruta app
app.use('/prospectiva', prospectiva);
app.use('/criterios', criterios);
app.use('/auditoriaPros', auditoria);
app.use('/criterioDes', criteriodes);
app.use('/respuesta', respuesta);
app.use('/arbol', arbol);
app.use('/correo', correo);

module.exports=app;