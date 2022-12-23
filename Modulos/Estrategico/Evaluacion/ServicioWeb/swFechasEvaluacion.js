const express = require("express");
const router = express.Router();
const feval = require('../Consultas/sqlFechasEvaluacion');
const auth=require('../../../Seguridad/Config/auth');
const aud= require('../../Consultas/sqlAuditoria');

// Servicio Ingresar fechas
router.post("/IngresarFechasEval", auth, (req, res) => {
    try {
      feval.IngresarFechaEval(req, (err, data) =>{
        if(data){
          if(data[0].f_ingresarfechas=="Correcto"){
            aud.IngresarAuditoria(req, function(data2){
              return res.json({ success: true, data: data[0].f_ingresarfechas });
            });
          }else{
            return res.json({ success: false, data: data[0].f_ingresarfechas });
          }
        }else{
          return res.json({ success: false, data: "Error en el proceso" });
        }
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

  module.exports=router;