const express = require("express");
const router = express.Router();
const eje = require('../Consultas/sqlEjes');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar tipo de árbol
router.post("/ListarEjes", auth, (req, res) => {
  var lstEje = null;
  try {
    eje.EjesEstrategico(req, (err, resp) => {
      lstEje = resp;
      if (lstEje == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: resp });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});