const express = require("express");
const router = express.Router();
const tdep = require('../Consultas/sqlDependencia');
const resp = require('../../Estrategico/Consultas/sqlResponsables');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Tipo dependencias
router.get("/ListaTipoDep", auth, (req, res) => {
  var lstTDep = null;
  try {
    tdep.TipoDependencia((err, tdep) => {
      lstTDep = tdep;
      if (lstTDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Tipo dependencias activas
router.get("/ListaTipoDepActivas", auth,(req, res) => {
  var lstTDep = null;
  try {
    tdep.TipoDependenciaActivo((err, tdep) => {
      lstTDep = tdep;
      if (lstTDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios ingresar tipo dependencia
router.post("/IngresarTipoDep/", auth,(req, res) => {
  try {
    tdep.IngresarTipoDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar tipo dependencia
router.post("/ModificarTipoDep/", auth,(req, res) => {
    try {
      tdep.ModificarTipoDependencia(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

// Servicio Listar dependencias
router.get("/ListaDependencia", auth,(req, res) => {
  var lstDep = null;
  try {
    tdep.Dependencia((err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar dependencias activas
router.get("/ListaDependenciaActivas", auth,(req, res) => {
  var lstDep = null;
  try {
    tdep.DependenciaAc((err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar dependencias por codigo
router.post("/ListaDependenciaCodigo", auth,(req, res) => {
  var lstDep = null;
  try {
    tdep.DependenciaCodigo(req, (err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar dependencias facultades y unidades administrativas
router.post("/ListaDependenciaFacAdm", auth,(req, res) => {
  var lstDep = null;
  var listado=[];
  try {
    tdep.DependenciaFacAdm(req, (err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        resp.ListarResponsables(req, (err, resp)=>{
          if(resp!=null){
            for(let dep of tdep){
              for(let re of resp){
                if(dep.dep_codigo!=re.replan_dependencia){
                  if(!listado.includes(dep)){
                    listado.push(dep);
                  }
                  if(!listado.includes(dep)){
                    listado.push(dep);
                  }
                }
              }
            }
            salida = true;
            return res.json({ success: salida, data: listado });
          }else{
            salida = true;
            return res.json({ success: salida, data: tdep });
          }
        })
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});


//Servicio Listar Dependencias que pertenecen
router.post("/ListaDependenciaPertenece", auth, (req, res)=>{
  var lstDep = null;
  try {
    tdep.DependenciaPert(req, (err, tdep) => {
      lstDep = tdep;
      if (lstDep == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: tdep });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
})

//Servicios ingresar tipo dependencia
router.post("/IngresarDependencia/", auth,(req, res) => {
  try {
    tdep.IngresarDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar dependencia
router.post("/ModificarDependencia/", auth,(req, res) => {
  try {
    tdep.ModificarDependencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});


module.exports = router;
