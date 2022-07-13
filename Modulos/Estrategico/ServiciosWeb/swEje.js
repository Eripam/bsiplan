const express = require("express");
const router = express.Router();
const eje = require('../Consultas/sqlEjes');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

// Servicio Listar estructura plan
router.post("/ListarEjes", auth, (req, res) => {
  var lstResp = null;
  try {
    eje.ListarEjes(req, (err, resp) => {
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

// Servicio Ingresar Eje
router.post("/IngresarEje", auth, (req, res) => {
  try {
    eje.IngresarEje(req, function (data) {
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

// Servicio Modificar Eje
router.post("/ModificarEje", auth, (req, res) => {
  try {
    eje.ModificarEje(req, function (data) {
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

// Servicio Eliminar eje
router.post("/EliminarEje", auth, (req, res) => {
  try {
    eje.EliminarEje(req, function (data) {
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