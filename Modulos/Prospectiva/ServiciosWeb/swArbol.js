const express = require("express");
const router = express.Router();
const arbol = require('../Consultas/sqlArbol');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar tipo de árbol
router.post("/ListarTipoArbol", auth, (req, res) => {
  var lstResp = null;
  try {
    arbol.TipoArbol(req, (err, resp) => {
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

// Servicio Listar estructura árbol
router.post("/ListarEstructuraArbol", auth, (req, res) => {
  var lstResp = null;
  try {
    arbol.ListaArbol(req, (err, resp) => {
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

// Servicio Ingresar árbol
router.post("/IngresarArbol", auth, (req, res) => {
  try {
    arbol.ValidarArbol(req, (err, data)=>{
      if(data[0].exists){
        arbol.EliminarArbol(req, function (data) {
          if(data){
            arbol.IngresarArbol(req, function (data) {
              return res.json({ success: data });
            });
          }
        });
      }else{
      arbol.IngresarArbol(req, function (data) {
        return res.json({ success: data });
      });
      }
    })
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Modificar árbol
router.post("/ModificarArbol", auth, (req, res) => {
  try {
    arbol.ModificarArbol(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Eliminar árbol
router.post("/EliminarArbol", auth, (req, res) => {
  try {
    arbol.EliminarArbol(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Eliminar árbol ID
router.post("/EliminarArbolID", auth, (req, res) => {
  try {
    arbol.EliminarArbolID(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports=router;