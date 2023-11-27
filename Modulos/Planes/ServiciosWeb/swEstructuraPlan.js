const express = require("express");
const router = express.Router();
const plan = require('../Consultas/sqlEstructuraPlan');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

// Servicio Listar estructura plan
router.post("/ListarEstructuraPlan", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarEstructuraPlan(req, (err, resp) => {
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

// Servicio Listar estructura plan select
router.post("/ListarEstructuraPlanSelect", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarEstructuraPlanSelect(req, (err, resp) => {
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

// Servicio Listar estructura plan mapa
router.post("/ListarEstructuraPlanMapa", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarEstructuraPlanMapa(req, (err, resp) => {
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

// Servicio Listar estructura plan hijos mapa
router.post("/ListarEstructuraPlanHijosMapa", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarEstructuraHijosMapa(req, (err, resp) => {
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

// Servicio Ingresar Estructura Planes
router.post("/IngresarEstructuraPlan", auth, (req, res) => {
  try {
    plan.IngresarEstructuraPlan(req, function (data) {
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

// Servicio Modificar Estructura Planes
router.post("/ModificarEstructuraPlanes", auth, (req, res) => {
  try {
    plan.ModificarEstructuraPlan(req, function (data) {
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

// Servicio Modificar Estructura Planes Indicadores
router.post("/ModificarEstructuraPlanesIndicador", auth, (req, res) => {
  try {
    plan.ModificarEstructuraPlanIndicador(req, function (data) {
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

//Servicio de validación eliminación
router.post("/ValidarEstructuraPlanes", auth, (req, res) => {
  try {
    plan.ValidacionEliminacionEstructura(req, (err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Eliminar estructura Planes
router.post("/EliminarEstructuraPlanes", auth, (req, res) => {
  try {
    plan.EliminarEstructuraPlan(req, function (data) {
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