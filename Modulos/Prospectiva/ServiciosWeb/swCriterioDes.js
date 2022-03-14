const express = require("express");
const router = express.Router();
const crit = require('../Consultas/sqlCriterioD');
const auth=require('../../Seguridad/Config/auth');

// Servicio Listar Criterios descripción
router.post("/ListaCriteriosDesc", auth,(req, res) => {
  var lstCri = null;
  try {
    crit.CriteriosDescripcion(req, (err, prosp) => {
        lstCri = prosp;
      if (lstCri == null) {
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


//Servicios ingresar Criterios Descripción
router.post("/IngresarCriterioDesc/", auth,(req, res) => {
    try {
      crit.IngresarCriteriosDes(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

//Servicios ingresar Consecuencia
router.post("/IngresarConsecuencia/", auth,(req, res) => {
    try {
      crit.IngresarConsecuencias(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

//Servicios acciones Consecuencia
router.post("/IngresarAcciones/", auth,(req, res) => {
    try {
      crit.IngresarAcciones(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
  });

//Servicios utopias
router.post("/IngresarUtopia/", auth,(req, res) => {
  try {
    crit.IngresarUtopias(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Criterios Descripción
router.post("/ModificarCriterioDesc/", auth,(req, res) => {
    try {
      crit.ModificarCriteriosDes(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});

//Servicios modificar Consecuencia
router.post("/ModificarConsecuencia/", auth,(req, res) => {
    try {
      crit.ModificarConsecuencia(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});

//Servicios modificar Acciones
router.post("/ModificarAccion/", auth,(req, res) => {
    try {
      crit.ModificarAccion(req, function (data) {
        return res.json({ success: data });
      });
    } catch (error) {
      return res.json({ success: false, info: error });
    }
});

//Servicios modificar Utopia
router.post("/ModificarUtopia/", auth,(req, res) => {
  try {
    crit.ModificarUtopias(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Eliminar criterio descripción
router.post("/EliminarCriterioD/", auth,(req, res) => {
  try {
    crit.EliminarCriterioD(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio de validación de criterios descripción
router.post("/ValidacionEliminacion", auth, (req, res) => {
  try {
    crit.ValidacionEliminacion(req, (err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio de validación de consecuencias
router.post("/ValidacionEliminacionCon", auth, (req, res) => {
  try {
    crit.ValidacionEliminacionCons(req, (err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicio de validación de acciones
router.post("/ValidacionEliminacionAcc", auth, (req, res) => {
  try {
    crit.ValidacionEliminacionAcc(req, (err, prosp) => {
      return res.json({ success: true, data: prosp[0].exists });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Eliminar consecuencia
router.post("/EliminarConsecuencia/", auth,(req, res) => {
  try {
    crit.EliminarConsecuencia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Eliminar acciones
router.post("/EliminarAccion/", auth,(req, res) => {
  try {
    crit.EliminarAccion(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Eliminar acciones
router.post("/EliminarUtopia/", auth,(req, res) => {
  try {
    crit.EliminarUtopia(req, function (data) {
      return res.json({ success: data });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports=router;