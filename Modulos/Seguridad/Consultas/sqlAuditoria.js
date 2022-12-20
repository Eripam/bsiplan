const pool = require("../Config/conBaseDatos");

//Ingreso de Prospectiva 
module.exports.IngresarAuditoria = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO auditoria.auditoria(aud_usuario, aud_proceso, aud_descripcion, aud_rol, aud_dependencia) VALUES ('"+req.body.aud_usuario+"', '"+req.body.aud_proceso+"', '"+req.body.aud_descripcion+"', '"+req.body.aud_rol+"', '"+req.body.aud_dependencia+"');"
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