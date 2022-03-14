const express = require("express");
const router = express.Router();
const rop = require('../Consultas/sqlRolOpciones');
const { route } = require("./swUsuarios");
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Rol Opción
router.get("/ListaRolOpcion", auth, (req, res) => {
  var lstROpc = null;
  try {
    rop.RolOpcion((err, rop) => {
      lstROpc = rop;
      if (lstROpc == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: rop });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Listar rol opciones
router.post("/ListaOpcionRol", auth,(req, res)=>{
  var lstOpR=null;
  try {
    rop.OpcionesRol(req, (err, rop)=>{
      lstOpR=rop;
      if(lstOpR==null){
        salida=false;
      }else{
        salida=true;
      }
      return res.json({success:salida, data:rop});
    });
  } catch (error) {
    return res.json({success:false, info:error});
  }
})

//Servicios ingresar Rol Opción
router.post("/IngresarRolOpcion/", auth,(req, res) => {
  try {
    rop.IngresarRolOpcion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Rol Opción
router.post("/ModificarRolOpcion/", auth,(req, res) => {
    try {
      rop.ModificarRolOpcion(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});

//Servicios Listar opciones por rol, usuario y dependencia
router.post("/ListarOpcionesUsuario", auth,(req, res)=>{
  var lstOpR=null;
  try {
    rop.OpcionesRolUsuario(req, (err, rop)=>{
      lstOpR=rop;
      if(lstOpR==null){
        salida=false;
      }else{
        salida=true;
      }
      return res.json({success:salida, data:rop});
    });
  } catch (error) {
    return res.json({success:false, info:error});
  }
})


module.exports = router;
