const express = require("express");
const router = express.Router();
const est = require('../Consultas/sqlEstructura');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

// Servicio Listar estructura
router.post("/ListarEstructura", auth, (req, res) => {
  var lstResp = null;
  try {
    est.ListarEstructura(req, (err, resp) => {
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

// Servicio Ingresar Estructura
router.post("/IngresarEstructura", auth, (req, res) => {
  try {
    est.IngresarEstructura(req, function (data) {
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

// Servicio Modificar Estructura
router.post("/ModificarEstructura", auth, (req, res) => {
  try {
    est.ModificarEstructura(req, function (data) {
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

// Servicio Eliminar Estructura
router.post("/EliminarEstructura", auth, (req, res) => {
    try {
      est.EliminarEstructura(req, function (data) {
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