const express = require("express");
const router = express.Router();
const plan = require('../Consultas/sqlPlanNacional');
const auth=require('../../Seguridad/Config/auth');
const aud= require('../Consultas/sqlAuditoria');

//Servicio Listar objetivos del plan nacional
router.post("/ListarObjetivos", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarObjetivosPlanN(req, (err, resp) => {
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
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Ingresar Objetivos del plan nacional
router.post("/IngresarObjetivos", auth, (req, res) => {
  try {
    plan.IngresarObjetivosPlanN(req, function (data) {
      if(data){
        aud.IngresarAuditoria(req, function(data){
          return res.json({ success: data });
        });
      }else{
        return res.json({ success: data });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Modificar Objetivos del plan nacional
router.post("/ModificarObjetivos", auth, (req, res) => {
    try {
      plan.ModificarObjetivosPlanN(req, function (data) {
        if(data){
          aud.IngresarAuditoria(req, function(data){
            return res.json({ success: data });
          });
        }else{
          return res.json({ success: data });
        }
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

  //Servicio Eliminar Objetivos del plan nacional
router.post("/EliminarObjetivos", auth, (req, res) => {
  try {
    plan.EliminarObjetivosPlanN(req, function (data) {
      if(data){
        aud.IngresarAuditoria(req, function(data){
          return res.json({ success: data });
        });
      }else{
        return res.json({ success: data });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Listar politicas del plan nacional
router.post("/ListarPoliticas", auth, (req, res) => {
    var lstResp = null;
    try {
      plan.ListarPoliticasPlanN(req, (err, resp) => {
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
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });
  
  //Servicio Ingresar Politicas del plan nacional
  router.post("/IngresarPoliticas", auth, (req, res) => {
    try {
      plan.IngresarPoliticasPlanN(req, function (data) {
        if(data){
          aud.IngresarAuditoria(req, function(data){
            return res.json({ success: data });
          });
        }else{
          return res.json({ success: data });
        }
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });  

//Servicio Modificar Politicas del plan nacional
router.post("/ModificarPoliticas", auth, (req, res) => {
  try {
    plan.ModificarPoliticasPlanN(req, function (data) {
        if(data){
        aud.IngresarAuditoria(req, function(data){
        return res.json({ success: data });
        });
        }else{
        return res.json({ success: data });
        }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});  

//Servicio Eliminar Politicas del plan nacional
router.post("/EliminarPolitica", auth, (req, res) => {
  try {
    plan.EliminarPoliticas(req, function (data) {
        if(data){
        aud.IngresarAuditoria(req, function(data){
        return res.json({ success: data });
        });
        }else{
        return res.json({ success: data });
        }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});  

//Servicio Listar metas del plan nacional
router.post("/ListarMetas", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarMetasPlanN(req, (err, resp) => {
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
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Ingresar metas del plan nacional
router.post("/IngresarMetas", auth, (req, res) => {
  try {
    plan.IngresarMetasPlanN(req, function (data) {
      if(data){
        aud.IngresarAuditoria(req, function(data){
          return res.json({ success: data });
        });
      }else{
        return res.json({ success: data });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});  

//Servicio Modificar metas del plan nacional
router.post("/ModificarMetas", auth, (req, res) => {
try {
  plan.ModificarMetasPlanN(req, function (data) {
      if(data){
      aud.IngresarAuditoria(req, function(data){
      return res.json({ success: data });
      });
      }else{
      return res.json({ success: data });
      }
  });
} catch (error) {
  return res.json({ success: false, info: error });
}
});  

//Servicio Eliminar metas del plan nacional
router.post("/EliminarMetas", auth, (req, res) => {
try {
  plan.EliminarMetas(req, function (data) {
      if(data){
      aud.IngresarAuditoria(req, function(data){
      return res.json({ success: data });
      });
      }else{
      return res.json({ success: data });
      }
  });
} catch (error) {
  return res.json({ success: false, info: error });
}
});  

//Servicio Listar indicadores del plan nacional
router.post("/ListarIndicadores", auth, (req, res) => {
  var lstResp = null;
  try {
    plan.ListarIndicadorPlanN(req, (err, resp) => {
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
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio Ingresar indicador del plan nacional
router.post("/IngresarIndicador", auth, (req, res) => {
  try {
    plan.IngresarIndicadorPlanN(req, function (data) {
      if(data){
        aud.IngresarAuditoria(req, function(data){
          return res.json({ success: data });
        });
      }else{
        return res.json({ success: data });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});  

//Servicio Modificar indicador del plan nacional
router.post("/ModificarIndicador", auth, (req, res) => {
try {
  plan.ModificarIndicadorPlanN(req, function (data) {
      if(data){
      aud.IngresarAuditoria(req, function(data){
      return res.json({ success: data });
      });
      }else{
      return res.json({ success: data });
      }
  });
} catch (error) {
  return res.json({ success: false, info: error });
}
}); 

//Servicio Eliminar indicador del plan nacional
router.post("/EliminarIndicador", auth, (req, res) => {
  try {
    plan.EliminarIndicador(req, function (data) {
        if(data){
        aud.IngresarAuditoria(req, function(data){
        return res.json({ success: data });
        });
        }else{
        return res.json({ success: data });
        }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
  }); 

module.exports=router;