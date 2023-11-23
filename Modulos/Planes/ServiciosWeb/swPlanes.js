const express = require("express");
const router = express.Router();
const plan = require('../Consultas/sqlPlan');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

//Servicio Listar planes completos
router.post("/ListarPlanes", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarPlanes(req, (err, resp) => {
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

// Servicio Listar tipos planes
router.get("/ListarTiposPlanes", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarTipoPlan((err, resp) => {
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

// Servicio Ingresar Planes
router.post("/IngresarPlanes", auth, (req, res) => {
  try {
    plan.IngresarPlan(req, function (data) {
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

// Servicio Modificar Planes
router.post("/ModificarPlanes", auth, (req, res) => {
  try {
    plan.ModificarPlan(req, function (data) {
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

//Servicio de validación de planes
router.post("/ValidarPlanes", auth, (req, res) => {
  try {
    plan.ValidacionEliminacion(req, (err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Eliminar Planes
router.post("/EliminarPlanes", auth, (req, res) => {
  try {
    plan.EliminarPlan(req, function (data) {
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