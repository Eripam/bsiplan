const express = require("express");
const router = express.Router();
const respuesta = require('../Consultas/sqlEvaluacion');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Respuestas
router.post("/ListaRespuestaC", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.RespuestaCompleta(req, (err, resp) => {
      lstResp = resp;
      if (lstResp == null) {
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

// Servicio Listar Prospectiva
router.post("/ListaRespuesta", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.Respuesta(req, (err, resp) => {
      lstResp = resp;
      if (lstResp == null) {
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

// Servicio Listar Tiempos
router.post("/ListaTiempos", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.Tiempo(req, (err, resp) => {
        lstResp = resp;
      if (lstResp == null) {
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


// Servicio Ingresar Tiempos
router.post("/IngresarTiempo", auth, (req, res) => {
  try {
    respuesta.IngresarTiempo(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Modificar Tiempos
router.post("/ModificarTiempo", auth, (req, res) => {
  try {
    respuesta.ModificarTiempo(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Ingresar evaluación
router.post("/IngresarRespuesta", auth, (req, res) => {
  try {
    respuesta.IngresarRespuesta(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Ingresar evaluación
router.post("/IngresarTabulacion", auth, (req, res) => {
  try {
    respuesta.IngresarTabulacion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Ingresar estado encuesta
router.post("/IngresarEncuestaEstado", auth, (req, res) => {
  try {
    respuesta.IngresarEncuestaEstado(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Eliminar tabulacion
router.post("/EliminarAccionesTab", auth, (req, res) => {
  try {
    respuesta.EliminarAccionesTab(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio de validación de encuestas enviadas
router.post("/ValidacionEncuesta", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.EncuestaEnviada(req, (err, prosp) => {
      lstResp = prosp;
      if (lstResp == null) {
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

//Servicio de validación de encuestas enviadas
router.post("/ListaRespuestaEn", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.ListarResultados(req, (err, prosp) => {
      lstResp = prosp;
      if (lstResp == null) {
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

//Servicio de validación de encuestas enviadas
router.post("/ListarAccionesEjes", auth, (req, res) => {
  var lstResp = null;
  try {
    respuesta.ListarAccionesEjes(req, (err, prosp) => {
      lstResp = prosp;
      if (lstResp == null) {
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

module.exports=router;