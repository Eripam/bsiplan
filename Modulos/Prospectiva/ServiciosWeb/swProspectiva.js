const express = require("express");
const router = express.Router();
const prosp = require('../Consultas/sqlProspectiva');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Prospectiva
router.post("/ListaProspectiva", auth, (req, res) => {
  var lstPros = null;
  try {
    prosp.Prospectivas(req, (err, prosp) => {
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

// Servicio Listar Prospectiva aprobado
router.get("/ListaProspectivaAprobada", auth, (req, res) => {
  var lstPros = null;
  try {
    prosp.ProspectivasAprobadas((err, prosp) => {
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

// Servicio Listar Prospectiva existe
router.get("/ListaProspectivaExiste", auth, (req, res) => {
  try {
    prosp.ProspectivasExiste((err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Prospectiva
router.post("/IngresarProspectiva/", auth, (req, res) => {
  try {
    prosp.IngresarProspectiva(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Modificar Prospectiva
router.post("/ModificarProspectiva/", auth, (req, res) => {
  try {
    prosp.ModificarProspectiva(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Visión-Misión
router.post("/IngresarVisionMision/", auth, (req, res) => {
  try {
    prosp.IngresarVisionMision(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Modificar Visión-Misión
router.post("/ModificarVisionMision/", auth, (req, res) => {
  try {
    prosp.ModificarVisionMision(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports = router;
