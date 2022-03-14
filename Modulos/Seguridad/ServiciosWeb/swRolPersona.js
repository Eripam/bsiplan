const express = require("express");
const router = express.Router();
const roles = require("../Consultas/sqlRolPersona");
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Roles
router.get("/ListaRolPersona", auth,(req, res) => {
  var lstRoles = null;
  try {
    roles.RolesPersona((err, roles) => {
      lstRoles = roles;
      if (lstRoles == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: roles });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Listar Rol Persona Dependencia
router.post("/ListaRolPersonaDep", auth, (req, res)=>{
  var lstRoles=null;
  try {
    roles.RolesPersonaDep(req, (err, roles) => {
      lstRoles = roles;
      if (lstRoles == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: roles });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
})

//Servicios ingresar roles
router.post("/IngresarRolPersona/", auth,(req, res) => {
  try {
    roles.IngresarRolPersona(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar roles
router.post("/ModificarRolPersona/", auth,(req, res) => {
    try {
      roles.ModificarRolPersona(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

module.exports = router;