const express = require("express");
const router = express.Router();
const respo = require('../Consultas/sqlResponsables');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

//Servicio Listar responsables
router.post("/ListarPlanesActivos", auth, (req, res) => {
    var lstResp = null;
    try {
      respo.ListarResponsables(req, (err, resp) => {
        lstResp = resp;
        if (lstResp == null && !err) {
          salida = false;
        } else if(lstResp!=null && err){
          salida = true;
        }else{
          salida='Error';
        }
        return res.json({ success: salida, data: resp });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});
  
// Servicio Ingresar responsable
router.post("/IngresarResponsable", auth, (req, res) => {
    try {
      respo.IngresarResponsable(req, (data) =>{
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