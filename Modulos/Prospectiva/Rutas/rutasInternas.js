const express=require('express');

const app = express();

//Importing Routes
const prospectiva = require('../ServiciosWeb/swProspectiva');
const criterios=require('../ServiciosWeb/swCriterios');
const auditoria=require('../ServiciosWeb/swAuditoria');
const criteriodes=require('../ServiciosWeb/swCriterioDes');

//Ruta app
app.use('/prospectiva', prospectiva);
app.use('/criterios', criterios);
app.use('/auditoriaPros', auditoria);
app.use('/criterioDes', criteriodes);

module.exports=app;