//Requerimos el paquete
const express = require("express");
const router = express.Router();
const email=require('./sqlenvioCorreo');
const auth=require('../Seguridad/Config/auth');

router.post("/envioCorreo", (req, res) => {
    var request = require('request');
    const strAsunto = req.body.strAsunto;
    const strCodigoSistema = req.body.strCodigoSistema;
    const strBody = req.body.strBody;
    const lstReceptores = req.body.lstReceptores;
    const lstArchivosAdjuntos = req.body.lstArchivosAdjuntos;
    var jsonDataObj = req.body;
    request.post({
        url: 'https://emailrelay.espoch.edu.ec/WebCorreoInstitucional/ServiciosCorreos/EnviarCorreo',
        body: jsonDataObj,
        rejectUnauthorized: false,
        json: true
    }, function (error, response, body) {
        res.json({
            success: body.success,
            mensajes: body.mensaje
        });
    });
});

router.post('/IngresarEnviarE', auth, (req, res)=>{
    try {
        email.EnviarEmailGeneral(req, function (data) {
          return res.json({ success: data });
        });
      } catch (error) {
        return res.json({ success: false, info: error });
      }
});

module.exports = router;
