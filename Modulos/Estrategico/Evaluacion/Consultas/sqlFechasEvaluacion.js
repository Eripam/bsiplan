const pool = require("../../Config/conBaseDatos");

//Listar fechas de actiación evaluación
module.exports.ListarFechasA = async function (req, callback){
    try {
        const response = await pool.pool.query("select * from estrategico.fechas_evaluacion where feval_estado=1");
        if(response.rowCount>0){
            callback(true, response.rows);
        }else{
            callback(false);
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

//Ingresar fecha evaluación
module.exports.IngresarFechaEval = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.fechas_evaluacion (feval_plan, feval_periodo, feval_fechai, feval_fechaf, feval_tipo, feval_anio, feval_prorroga) values('"+req.body.feval_plan+"', '"+req.body.feval_periodo+"', '"+req.body.feval_fechai+"', '"+req.body.feval_fechaf+"', '"+req.body.feval_tipo+"', '"+req.body.feval_anio+"', '"+req.body.feval_prorroga+"');");
        if (response.rowCount > 0) {
            callback(true);
          } else {
            callback(false);
          }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

 //Validacion de eliminación de planes estratégicos
 module.exports.ValidacionEliminacion = async function (req, callback) {
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.plan_estrategico where plan_planid='"+req.body.codigo+"');");
        if (response.rowCount > 0) {
          callback(true, response.rows);
        } else {
          callback(false);
        }
    } catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
  };