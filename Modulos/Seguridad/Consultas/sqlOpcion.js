const pool = require("../Config/conBaseDatos");

//Lista de Opción que se encuentren registrados en el sistema
module.exports.Opcion = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when opc_estado=1 then 'Activo' when opc_estado=0 then 'Inactivo' end opc_estado_nombre from seguridad.opciones order by opc_codigo;"
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

//Lista de Opción que se encuentren registrados en el sistema activos
module.exports.OpcionActivos = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.opciones where opc_estado=1 order by opc_orden;"
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

//Ingreso de Opción 
module.exports.IngresarOpcion = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.opciones(opc_codigo, opc_nombre, opc_descripcion, opc_url, opc_orden) VALUES ((select * from seguridad.f_codigo_seguridad(5)), '" +req.body.opc_nombre +"', '"+req.body.opc_descripcion+"', '"+req.body.opc_url+"', '"+req.body.opc_orden+"');"
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

//Modificación de Opción 
module.exports.ModificarOpcion = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.opciones SET opc_nombre='" +req.body.opc_nombre +"', opc_estado='"+req.body.opc_estado+"', opc_descripcion='"+req.body.opc_descripcion+"', opc_url='"+req.body.opc_url+"', opc_orden='"+req.body.opc_orden+"' where opc_codigo='" +req.body.opc_codigo +"';");
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