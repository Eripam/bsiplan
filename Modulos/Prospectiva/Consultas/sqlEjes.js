const pool = require("../Config/conBaseDatos");

//Lista tipo ejes estratégicos que se encuentren registrados en el sistema
module.exports.TipoEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "select * from prospectiva.tipo_eje where teje_prospectiva=(select pro_proid from prospectiva.prospectiva where pro_id='" +
        req.body.codigo +
        "')"
    );
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista ejes estratégicos que se encuentren registrados en el sistema
module.exports.EjesEstrategico = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "select * from prospectiva.ejes_estrategicos inner join prospectiva.tipo_eje on eje_teje=teje_id where eje_prospectiva='" +
        req.body.codigo +
        "';"
    );
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Ingreso de roles por persona
module.exports.IngresarRolPersona = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "INSERT INTO seguridad.rol_persona(rpe_persona, rpe_rol, rpe_dependencia) VALUES ('" +
        req.body.rpe_persona +
        "', '" +
        req.body.rpe_rol +
        "', '" +
        req.body.rpe_dependencia +
        "');"
    );
    if (response.rowCount > 0) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Ingresar ejes estratégicos
module.exports.IngresarEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "INSERT INTO prospectiva.ejes_estrategicos(eje_id, eje_teje, eje_prospectiva, eje_nombre, eje_descripcion, eje_microescenario) VALUES (select * from prospectiva.f_codigo_prospectiva(10), '" +
        req.body.teje +
        "', '" +
        eje_prospectiva +
        "', '" +
        eje_nombre +
        "', '" +
        eje_descripcion +
        "', '" +
        eje_microescenario +
        "');"
    );
    if (response.rowCount > 0) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Modificar ejes estratégicos
module.exports.ModificarEjes = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "Update prospectiva.ejes_estrategicos set eje_teje='" +
          req.body.teje +
          "',eje_prospectiva='" +
          req.body.eje_prospectiva +
          "',eje_nombre='" +
          req.body.eje_nombre +
          "',eje_descripcion= '" +
          req.body.eje_descripcion +
          "',eje_microescenario='" +
          req.body.eje_microescenario +
          "' where eje_id='"+req.body.eje_id+"';"
      );
      if (response.rowCount > 0) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
  };
  