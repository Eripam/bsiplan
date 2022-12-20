const express = require("express");
const router = express.Router();
const cron = require('../Consultas/sqlCronograma');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

// Servicio Listar cronograma
router.post("/ListarCronograma", auth, (req, res) => {
    var lstResp = null;
    try {
      cron.ListarCronograma(req, (err, resp) => {
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

  // Servicio Listar estructura cronograma
router.post("/ListarEstructuraCronograma", auth, (req, res) => {
  var lstResp = null;
  try {
    cron.ListarEstructuraCronograma(req, (err, resp) => {
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

// Servicio Ingresar Cronograma
router.post("/IngresarCronograma", auth, (req, res) => {
  try {
    cron.IngresarCronograma(req, (data) =>{
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

// Servicio Modificar Cronograma
router.post("/ModificarCronograma", auth, (req, res) => {
  try {
    cron.ModificarCronograma(req, (data) =>{
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

// Servicio Listar periodo
router.post("/ListarPeriodo", auth, (req, res) => {
  var lstResp = null;
  try {
    cron.ListarPeriodo(req,(err, resp) => {
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

// Servicio Listar periodo plan
router.post("/ListarPeriodoPlan", auth, (req, res) => {
  var lstResp = null;
  try {
    cron.ListarPeriodoPlan(req, (err, resp) => {
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

// Servicio Ingresar Periodo
router.post("/IngresarPeriodo", auth, (req, res) => {
  try {
    cron.IngresarPeriodo(req, (data) =>{
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

// Servicio Ingresar Periodo
router.post("/IngresarPeriodoPlan", auth, (req, res) => {
  try {
    cron.IngresarPeriodoPlan(req, (data) =>{
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

// Servicio Modificar Periodo
router.post("/ModificarPeriodoPlan", auth, (req, res) => {
  try {
    cron.ModificarPeriodoPlan(req, (data) =>{
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

// Servicio Eliminar Periodo
router.post("/EliminarPeriodoPlan", auth, (req, res) => {
  try {
    cron.EliminarPeriodoPlan(req, (data) =>{
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

// Servicio Modificar Periodo
router.post("/ModificarPeriodo", auth, (req, res) => {
  try {
    cron.ModificarPeriodo(req, (data) =>{
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

// Servicio Eliminar Periodo
router.post("/EliminarPeriodo", auth, (req, res) => {
  try {
    cron.EliminarPeriodo(req, (data) =>{
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