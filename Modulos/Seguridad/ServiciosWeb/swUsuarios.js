const express = require("express");
const router = express.Router();
const usuario = require("../Consultas/sqlUsuario");

// Servicio Listar usuarios
router.get("/ListaUsuarios", (req, res) => {
  var lstUsuarios = null;
  try {
    usuario.Usuarios((err, usuarios) => {
      lstUsuarios = usuarios;
      if (lstUsuarios == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: usuarios });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar usuarios
router.post("/IngresarUsuario/", (req, res) => {
  try {
    usuario.IngresarUsuario(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

router.post("/ModificarUsuario/", (req, res) => {
  try {
    usuario.ModificarUsuario(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar usuarios activos
router.get("/ListaUsuariosActivos", (req, res) => {
  var lstUsuarios = null;
  try {
    usuario.UsuariosActivos((err, usuarios) => {
      lstUsuarios = usuarios;
      if (lstUsuarios == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: usuarios });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});
module.exports = router;
