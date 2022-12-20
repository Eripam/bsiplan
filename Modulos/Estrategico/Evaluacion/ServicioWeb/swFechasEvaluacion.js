const express = require("express");
const router = express.Router();
const feval = require('../Consultas/sqlFechasEvaluacion');
const auth=require('../../../Seguridad/Config/auth');
const aud= require('../../Consultas/sqlAuditoria');

// Servicio Ingresar fechas
router.post("/IngresarFechasEval", auth, (req, res) => {
    try {
      feval.IngresarFechaEval(req, (data) =>{
        if(data){
          aud.IngresarAuditoria(req, function(data){
            return res.json({ success: data });
          });
        }else{
          return res.json({ success: data });
        }
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

  module.exports=router;