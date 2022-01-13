const pool = require("../Config/conBaseDatos");

//Lista Padre Opción que se encuentren registrados en el sistema
module.exports.PadreOpcion = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when pop_estado=1 then 'Activo' when pop_estado=0 then 'Inactivo' end pop_estado_nombre from seguridad.padre_opcion order by pop_codigo;"
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

//Ingreso de Padre Opción 
module.exports.IngresarPadreOpcion = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.padre_opcion(pop_codigo, pop_nombre, pop_icono) VALUES ((select * from seguridad.f_codigo_seguridad(4)), '" +req.body.pop_nombre +"', '"+req.body.pop_icono+"');"
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

//Modificación de Padre opción 
module.exports.ModificarPadreOpcion = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.padre_opcion SET pop_nombre='" +req.body.pop_nombre +"', pop_estado='"+req.body.pop_estado+"', pop_icono='"+req.body.pop_icono+"' where pop_codigo='" +req.body.pop_codigo +"';");
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