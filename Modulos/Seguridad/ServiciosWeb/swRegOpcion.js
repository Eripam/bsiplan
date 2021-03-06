const express = require("express");
const router = express.Router();
const ropc = require('../Consultas/sqlReglamentoOp');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Reglamentos Opción
router.get("/ListaRegOp", auth, (req, res) => {
  var lstRopc = null;
  try {
    ropc.ReglamentoOp((err, ropc) => {
      lstRopc = ropc;
      if (lstRopc == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: ropc });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Reglamentos Opción
router.post("/IngresarRegOpcion/", auth, (req, res) => {
  try {
    ropc.IngresarRegOp(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Reglamento Opción
router.post("/ModificarRegOpcion/", auth, (req, res) => {
    try {
    ropc.ModificarRegOp(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});


module.exports = router;
