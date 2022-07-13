const express = require("express");
const router = express.Router();
const eje = require('../Consultas/sqlEjes');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar ejes estratégicos
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

// Servicio Listar tipo de ejes
router.post("/ListarTipoEjes", auth, (req, res) => {
  var lstEje = null;
  try {
    eje.TipoEjes(req, (err, resp) => {
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

//Servicio ingreso de ejes estratégicos
router.post("/IngresarEjes/", auth,(req, res) => {
  try {
    eje.IngresarEjes(req, function (data) {
        return res.json({ success: data }); 
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio ingreso de ejes estratégicos
router.post("/IngresarTipoEjes/", auth,(req, res) => {
  try {
    eje.IngresarTipoEje(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio modificar de ejes estratégicos
router.post("/ModificarTipoEjes/", auth,(req, res) => {
  try {
    eje.ModificarTEjes(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio elimniar de ejes estratégicos
router.post("/EliminarTipoEjes/", auth,(req, res) => {
  try {
    eje.EliminarTipoEjes(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar ejes estratégico
router.post("/ModificarEjes/", auth,(req, res) => {
  try {
    eje.ModificarEjes(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios eliminar ejes
router.post("/EliminarEjes/", auth,(req, res) => {
  try {
    eje.EliminarEjes(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports=router;