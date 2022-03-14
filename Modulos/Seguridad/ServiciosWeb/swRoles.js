const express = require("express");
const router = express.Router();
const roles = require("../Consultas/sqlRol");
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Roles
router.get("/ListaRoles", auth, (req, res) => {
  var lstRoles = null;
  try {
    roles.Roles((err, roles) => {
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

//Servicios ingresar roles
router.post("/IngresarRol/", auth, (req, res) => {
  try {
    roles.IngresarRol(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar roles
router.post("/ModificarRol/", (req, res) => {
    try {
      roles.ModificarRol(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

// Servicio Listar Roles activos
router.get("/ListaRolesActivos", (req, res) => {
  var lstRoles = null;
  try {
    roles.RolesActivos((err, roles) => {
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

// Servicio Listar Roles activos
router.get("/ListaRolesActivosD", (req, res) => {
  var lstRoles = null;
  try {
    roles.RolesActivosD((err, roles) => {
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


module.exports = router;
