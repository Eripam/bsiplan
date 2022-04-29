//Requerimos el paquete
const express = require("express");
const router = express.Router();

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

module.exports = router;
