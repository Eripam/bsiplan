const express = require("express");
const router = express.Router();
const rop = require('../Consultas/sqlRolOpciones');
const { route } = require("./swUsuarios");

// Servicio Listar Rol Opción
router.get("/ListaRolOpcion", (req, res) => {
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
router.post("/ListaOpcionRol", (req, res)=>{
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
router.post("/IngresarRolOpcion/", (req, res) => {
  try {
    rop.IngresarRolOpcion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Rol Opción
router.post("/ModificarRolOpcion/", (req, res) => {
    try {
      rop.ModificarRolOpcion(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});


module.exports = router;
