const express = require("express");
const router = express.Router();
const pdf = require('../Herramientas/pdf');
const auth=require('../../Seguridad/Config/auth');

router.get("/pruebapdf/", pdf.generarPDF);

module.exports=router;