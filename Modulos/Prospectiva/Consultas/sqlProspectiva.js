const pool = require("../Config/conBaseDatos");

//Lista prospectivas que se encuentren registrados en el sistema
module.exports.Prospectivas = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when pro_estado=1 then 'Activo' when pro_estado=0 then 'Inactivo' end pro_estado_nombre from prospectiva.prospectiva order by pro_id;"
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
module.exports.IngresarProspectiva = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO prospectiva.prospectiva(pro_id, pro_proid, pro_nombre, pro_fi, pro_ff) VALUES ((select * from prospectiva.f_codigo_prospectiva(1)), '" +req.body.pro_proid +"', '"+req.body.pro_nombre+"', '"+req.body.pro_fi+"', '"+req.body.pro_ff+"');"
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