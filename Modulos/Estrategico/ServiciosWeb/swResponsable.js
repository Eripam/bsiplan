const express = require("express");
const router = express.Router();
const respo = require('../Consultas/sqlResponsables');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

//Servicio Listar responsables
router.post("/ListarResponsables", auth, (req, res) => {
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
      var sum=0;
      if(req.body.responsables.length>0){
        for(let res of req.body.responsables){
          const dato={
            replan_plan:req.body.eplan_id,
            replan_dependencia:res,
            replan_tipo:req.body.tipo
          }
          respo.IngresarResponsable(dato, (data) =>{
            if(data){
              sum++;
            }
          });
        }
      }else{
        for(let res of req.body.coresponsables){
          const dato={
            replan_plan:req.body.eplan_id,
            replan_dependencia:res,
            replan_tipo:req.body.tipo
          }
          respo.IngresarResponsable(dato, (data) =>{
            if(data){
              sum++;
            }
          });
        }
      }
      

      if(sum==req.body.responsables.length || sum==req.body.coresponsables.length){
        aud.IngresarAuditoria(req, function(data){
          return res.json({ success: data });
        });
      }else{
        return res.json({ success: false });
      }
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

  //Servicios Eliminar responsable
router.post("/EliminarResponsable/", auth,(req, res) => {
  try {
    respo.EliminarResponsable(req, function (data) {
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