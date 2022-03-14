const pool = require("../Config/conBaseDatos");

//Lista criterios que se encuentren registrados en el sistema
module.exports.Criterios = async function (req, callback) {
  try {
    const response = await pool.pool.query(
        "select *, CASE when cri_estado=1 then 'Activo' when cri_estado=0 then 'Inactivo' end cri_estado_nombre from prospectiva.criterio left join prospectiva.encabezado on cri_id=enc_criterio where cri_prospectiva='"+req.body.codigo+"' and (enc_estado=1 or enc_estado is null) order by cri_id;"
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

//Lista criterios activos que se encuentren registrados en el sistema
module.exports.CriteriosActivos = async function (req, callback) {
  try {
    const response = await pool.pool.query(
        "select * from prospectiva.criterio left join prospectiva.encabezado on cri_id=enc_criterio where cri_prospectiva='"+req.body.codigo+"' and (enc_estado=1 or enc_estado is null) and cri_estado=1 order by cri_id;"
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

//Lista tipo criterios que se encuentren registrados en el sistema
module.exports.TipoCriterios = async function (req, callback) {
  try {
    const response = await pool.pool.query(
        "select * from prospectiva.fases where fase_estado=1 order by fase_id;"
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

//Ingreso de Prospectiva 
module.exports.IngresarCriterios = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO prospectiva.criterio(cri_id, cri_prospectiva, cri_nombre, cri_fase) VALUES ((select * from prospectiva.f_codigo_prospectiva(2)), " +req.body.cri_prospectiva +", '"+req.body.cri_nombre+"', '"+req.body.cri_fase+"');"
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

//Ingreso de Encabezado 
module.exports.IngresarEncabezado = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "INSERT INTO prospectiva.encabezado(enc_id, enc_criterio, enc_descripcion, enc_consecuencias, enc_acciones) VALUES ((select * from prospectiva.f_codigo_prospectiva(3)), " +req.body.enc_criterio +", '"+req.body.enc_descripcion+"', '"+req.body.enc_consecuencias+"', '"+req.body.enc_acciones+"');"
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

  //Modificar criterios 
module.exports.ModificarCriterios = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "UPDATE prospectiva.criterio SET cri_nombre='"+req.body.cri_nombre+"', cri_estado='"+req.body.cri_estado+"' where cri_id='"+req.body.cri_id+"';");
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

//Modificar Encabezado 
module.exports.ModificarEncabezado = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "UPDATE prospectiva.encabezado SET enc_descripcion='"+req.body.enc_descripcion+"', enc_consecuencias='"+req.body.enc_consecuencias+"', enc_acciones='"+req.body.enc_acciones+"' where enc_id='"+req.body.enc_id+"';");
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