const express = require("express");
const router = express.Router();
const aud = require('../Consultas/sqlAuditoria');

//Servicios ingresar Criterios
router.post("/IngresarAuditoria/", (req, res) => {
  try {
    aud.IngresarAuditoria(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports = router;