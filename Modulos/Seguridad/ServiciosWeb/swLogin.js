const express = require("express");
const router = express.Router();
const login = require('../Consultas/sqlLogin');
const jwt = require('jsonwebtoken');
const JWT_Secret = 'S!pl@n1';
const moment=require("moment");

// Servicio Login
router.post("/Login", (req, res) => {
  var lstLog = null;
  var token=null;
  try {
    login.Login(req, (err, log) => {
        lstLog = log;
      if (lstLog == null) {
        salida = false;
        token=null;
      } else {
        salida = true;
        var value=log;
        token=jwt.sign({value}, JWT_Secret, { expiresIn: "1h", });
      }
      return res.json({ success: salida, token:token });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Login correo
router.post("/LoginCorreo", (req, res) => {
  var lstLog = null;
  var token=null;
  try {
    login.LoginCorreo(req, (err, log) => {
        lstLog = log;
      if (lstLog == null) {
        salida = false;
        token=null;
      } else {
        salida = true;
        var value=log;
        token=jwt.sign({value}, JWT_Secret, { expiresIn: "1h", });
      }
      return res.json({ success: salida, token:token });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Login correo
router.post("/LoginRolDep", (req, res) => {
  var lstLog = null;
  var token=null;
  try {
    login.LoginRolDep(req, (err, log) => {
        lstLog = log;
      if (lstLog == null) {
        salida = false;
        token=null;
      } else {
        salida = true;
        var value=log;
        token=jwt.sign({value}, JWT_Secret, { expiresIn: "1h", });
      }
      return res.json({ success: salida, token:token });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Decode
router.post("/DLogin", (req, res) => {
  try {
    jwt.verify(req.body.token, req.body.key, function(err,decode){
      if(err){
        return res.json("Datos incorrectos");
      }else{
        var decode=jwt.decode(req.body.token, req.body.key, {payload:true});
        if (decode.exp <= moment().unix()) {
          return res.json({ message: "El token ha expirado" });
        }else{
        return res.json({success:true, data: decode});
        }
      }
    })
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Perfil
router.post("/ListarPerfil", (req, res) => {
  var lstPerfil = null;
  try {
    login.ListaPerfil(req,(err, perfiles) => {
      lstPerfil = perfiles;
      if (lstPerfil == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: perfiles });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Verificar si existe perfiles
router.post("/VerificarOpcion", (req, res) => {
  try {
    login.RegistradoPagina(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports=router;