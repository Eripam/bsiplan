const pool = require("../Config/conBaseDatos");

//Lista roles por persona que se encuentren registrados en el sistema
module.exports.RolesPersona = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when rpe_estado=1 then 'Activo' when rpe_estado=0 then 'Inactivo' end rpe_estado_nombre from seguridad.rol_persona inner join seguridad.persona on rpe_persona=per_codigo inner join seguridad.dependencia on rpe_dependencia=dep_codigo inner join seguridad.rol on rpe_rol=rol_codigo where per_estado=1 and rol_estado=1 and dep_estado=1 order by rpe_persona, dep_codigo, rol_codigo, rpe_estado;"
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
        "INSERT INTO seguridad.rol_persona(rpe_persona, rpe_rol, rpe_dependencia) VALUES ('"+req.body.rpe_persona+"', '" +req.body.rpe_rol +"', '" +req.body.rpe_dependencia +"');"
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

//Modificación de roles por persona
module.exports.ModificarRolPersona = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.rol_persona SET rpe_rol='" +req.body.rpe_rol +"', rpe_dependencia='" +req.body.rpe_dependencia +"', rpe_estado='"+req.body.rpe_estado+"' where rpe_persona='" +req.body.rpe_persona +"' and rpe_rol='"+req.body.rpe_rol_m+"' and rpe_dependencia='"+req.body.rpe_dependencia_m+"';");
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
  