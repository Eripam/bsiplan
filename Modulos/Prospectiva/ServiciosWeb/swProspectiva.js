const express = require("express");
const router = express.Router();
const prosp = require('../Consultas/sqlProspectiva');

// Servicio Listar Prospectiva
router.get("/ListaProspectiva", (req, res) => {
  var lstPros = null;
  try {
    prosp.Prospectivas((err, prosp) => {
        lstPros = prosp;
      if (lstPros == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: prosp });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Prospectiva
router.post("/IngresarProspectiva/", (req, res) => {
  try {
    prosp.IngresarProspectiva(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports = router;
