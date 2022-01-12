const express = require("express");
const router = express.Router();
const roles = require("../Consultas/sqlRolPersona");

// Servicio Listar Roles
router.get("/ListaRolPersona", (req, res) => {
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

//Servicios ingresar roles
router.post("/IngresarRolPersona/", (req, res) => {
  try {
    roles.IngresarRolPersona(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar roles
router.post("/ModificarRolPersona/", (req, res) => {
    try {
      roles.ModificarRolPersona(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

module.exports = router;

/*producto: asesoramiento en anulación de justificativos del año 2021
no debe realizarse las anulaciones */