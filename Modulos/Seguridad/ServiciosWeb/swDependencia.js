const express = require("express");
const router = express.Router();
const tdep = require('../Consultas/sqlDependencia');

// Servicio Listar Tipo dependencias
router.get("/ListaTipoDep", (req, res) => {
  var lstTDep = null;
  try {
    tdep.TipoDependencia((err, tdep) => {
      lstTDep = tdep;
      if (lstTDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Tipo dependencias activas
router.get("/ListaTipoDepActivas", (req, res) => {
  var lstTDep = null;
  try {
    tdep.TipoDependenciaActivo((err, tdep) => {
      lstTDep = tdep;
      if (lstTDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar tipo dependencia
router.post("/IngresarTipoDep/", (req, res) => {
  try {
    tdep.IngresarTipoDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar tipo dependencia
router.post("/ModificarTipoDep/", (req, res) => {
    try {
      tdep.ModificarTipoDependencia(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

// Servicio Listar dependencias
router.get("/ListaDependencia", (req, res) => {
  var lstDep = null;
  try {
    tdep.Dependencia((err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar dependencias activas
router.get("/ListaDependenciaActivas", (req, res) => {
  var lstDep = null;
  try {
    tdep.DependenciaAc((err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar tipo dependencia
router.post("/IngresarDependencia/", (req, res) => {
  try {
    tdep.IngresarDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar dependencia
router.post("/ModificarDependencia/", (req, res) => {
  try {
    tdep.ModificarDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});


module.exports = router;
