const express = require("express");
const router = express.Router();
const popc = require('../Consultas/sqlPadreOpcion');

// Servicio Listar Padre Opción
router.get("/ListaPadreOpcion", (req, res) => {
  var lstPOpc = null;
  try {
    popc.PadreOpcion((err, popc) => {
      lstPOpc = popc;
      if (lstPOpc == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: popc });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Padre Opción
router.post("/IngresarPadreOpcion/", (req, res) => {
  try {
    popc.IngresarPadreOpcion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Padre Opción
router.post("/ModificarPadreOpcion/", (req, res) => {
    try {
      popc.ModificarPadreOpcion(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});


module.exports = router;
