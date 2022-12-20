const express = require("express");
const router = express.Router();
const pdf = require('../../Estrategico/pdf');
const auth=require('../../../Seguridad/Config/auth');

router.get("/cronograma/:id", pdf.generarPDF);

router.post("/cronograma", auth, (req, res)=>{
    try {
        pdf.generarPDF(req, (err, resp) => {
            lstResp = resp;
            if (lstResp == null && !err) {
                salida = false;
            } else if(lstResp!=null && err){
                salida = true;
            }else{
                salida='Error';
            }
            return res.json({ success: salida, data: resp });
        });
        //const contents = pdf.generarPDF(req);
    } catch (error) {
        return res.json({ success: false, info: error });
    }
});

module.exports=router;