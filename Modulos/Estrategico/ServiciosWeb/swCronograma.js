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
    cron.ListarCronograma(req, (err, resp) =>{
    lstResp=resp;
    if(lstResp==null && !err){
        cron.IngresarCronograma(req, function (data) {
            if(data){
               aud.IngresarAuditoria(req, function(data){
               return res.json({ success: data });
               });
            }else{
               return res.json({ success: data });
            }
           });
    }else if(lstResp!=null && err){
        cron.ModificarCronograma(req, function (data) {
            if(data){
               aud.IngresarAuditoria(req, function(data){
               return res.json({ success: data });
               });
            }else{
               return res.json({ success: data });
            }
           });
    }else{
        return res.json({success:false});
    }

    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports=router;