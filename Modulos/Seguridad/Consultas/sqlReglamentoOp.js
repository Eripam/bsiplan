const pool = require("../Config/conBaseDatos");

//Lista roles que se encuentren registrados en el sistema
module.exports.ReglamentoOp = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when reop_estado=1 then 'Activo' when reop_estado=0 then 'Inactivo' end reop_estado_nombre from seguridad.reglamento_opcion inner join seguridad.reglamento on reop_reglamento=reg_codigo join seguridad.opciones on reop_opcion=opc_codigo where reg_codigo=1 and opc_estado=1 order by reop_reglamento, reop_opcion;"
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
module.exports.IngresarRegOp = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.reglamento_opcion(reop_reglamento, reop_opcion, reop_fecha_inicio) VALUES ('"+req.body.reop_reglamento+"', '" +req.body.reop_opcion +"', '" +req.body.reop_fecha_inicio +"');"
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
module.exports.ModificarRegOp = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.reglamento_opcion SET reop_opcion='" +req.body.reop_opcion +"', reop_fecha_inicio='"+req.body.reop_fecha_inicio+"', reop_fecha_fin='now()' where reop_reglamento='" +req.body.reop_reglamento +"' and reop_opcion='"+req.body.reop_opcion_m+"';");
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