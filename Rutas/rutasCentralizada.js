const express=require('express');
const router = express.Router();
const Request = require('request');

//Servicio web que trae los datos de la persona ingresando el número de cédula
router.get('/usuarioPorCedula/:Cedula', (req, res)=>{
    const strCedula = req.params.Cedula;
    var datos;
    Request.get("http://servicioscentral.espoch.edu.ec/Central/ServiciosPersona.svc/ObtenerPorDocumento/"+strCedula, (error, response, body)=>{
        if(body == ""){
            return res.json({
                success:false
            })
        }else{
            datos=JSON.parse((body))
            res.json({
                success:true,
                datos
            });
        }
    });
});

module.exports = router;