const pool = require("../Config/conBaseDatos");

//Lista roles que se encuentren registrados en el sistema
module.exports.Roles = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when rol_estado=1 then 'Activo' when rol_estado=0 then 'Inactivo' end rol_estado_nombre from seguridad.rol order by rol_codigo;"
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

//Ingreso de roles 
module.exports.IngresarRol = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.rol(rol_codigo, rol_nombre, rol_descripcion, rol_estado) VALUES ((select * from seguridad.f_codigo_seguridad(1)), '" +req.body.rol_nombre +"', '" +req.body.rol_descripcion +"', 1);"
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

//Modificación de roles 
module.exports.ModificarRol = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.rol SET rol_nombre='" +req.body.rol_nombre +"', rol_descripcion='" +req.body.rol_descripcion +"', rol_estado='"+req.body.rol_estado+"' where rol_codigo='" +req.body.rol_codigo +"';");
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

  //Lista roles activos
module.exports.RolesActivos = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.rol where rol_estado=1 order by rol_codigo"
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

  //Lista roles activos
  module.exports.RolesActivosD = async function (callback) {
    try {
      const response = await pool.pool.query(
        "select * from seguridad.rol where rol_estado=1 and rol_codigo<>5 order by rol_codigo"
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
  