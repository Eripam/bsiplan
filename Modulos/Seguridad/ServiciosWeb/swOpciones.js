const express = require("express");
const router = express.Router();
const opc = require('../Consultas/sqlOpcion');

// Servicio Listar Opción
router.get("/ListaOpcion", (req, res) => {
  var lstOpc = null;
  try {
    opc.Opcion((err, opc) => {
      lstOpc = opc;
      if (lstOpc == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: opc });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Opción activos
router.get("/ListaOpcionActivos", (req, res) => {
  var lstOpc = null;
  try {
    opc.OpcionActivos((err, opc) => {
      lstOpc = opc;
      if (lstOpc == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: opc });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Opción
router.post("/IngresarOpcion/", (req, res) => {
  try {
    opc.IngresarOpcion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Opción
router.post("/ModificarOpcion/", (req, res) => {
    try {
      opc.ModificarOpcion(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});


module.exports = router;
