const express = require("express");
const router = express.Router();
const crit = require('../Consultas/sqlCriterios');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Prospectiva
router.post("/ListaCriterios", auth,(req, res) => {
  var lstCri = null;
  try {
    crit.Criterios(req, (err, prosp) => {
        lstCri = prosp;
      if (lstCri == null) {
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

// Servicio Listar Criterios Activos
router.post("/ListaCriteriosActivos", auth, (req, res) => {
  var lstCri = null;
  try {
    crit.CriteriosActivos(req, (err, prosp) => {
        lstCri = prosp;
      if (lstCri == null) {
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

// Servicio Listar Tipo Criterios
router.get("/ListaFases", auth, (req, res) => {
  var lstCri = null;
  try {
    crit.TipoCriterios(req, (err, prosp) => {
        lstCri = prosp;
      if (lstCri == null) {
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

//Servicios ingresar Criterios
router.post("/IngresarCriterio/", auth,(req, res) => {
  try {
    crit.IngresarCriterios(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar Encabezados
router.post("/IngresarEncabezados/", auth,(req, res) => {
    try {
      crit.IngresarEncabezado(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

//Servicios Modificar Criterios
router.post("/ModificarCriterio/", auth,(req, res) => {
  try {
    crit.ModificarCriterios(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Modificar Criterios
router.post("/ModificarEncabezado/", auth,(req, res) => {
  try {
    crit.ModificarEncabezado(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports = router;
