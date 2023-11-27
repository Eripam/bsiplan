const pool = require("../Config/conBaseDatos");

//Listar planes completos
module.exports.ListarPlanes = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when plan_estado=1 then 'Activo' when plan_estado=0 then 'Inactivo' when plan_estado=2 then 'Aprobado' end as estadonombre FROM planes.planes order by plan_id;");
        }else{
            response = await pool.pool.query("SELECT *  FROM planes.planes where plan_estado=1 order by plan_id;");
        }
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

//Listar tipo plan
module.exports.ListarTipoPlan = async function (callback){
    try {
        const response = await pool.pool.query("SELECT * FROM planes.tipo_plan where tplan_estado=1;");
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

//Ingresar plan
module.exports.IngresarPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO planes.planes(plan_id, plan_nombre, plan_fecha_inicio, plan_fecha_fin, plan_tipoplan, plan_planest, plan_poa) VALUES ((select * from planes.f_codigo_planes(1)), '"+req.body.plan_nombre+"', '"+req.body.plan_fecha_inicio+"', '"+req.body.plan_fecha_fin+"', '"+req.body.plan_tipoplan+"', '"+req.body.plan_planest+"', '"+req.body.plan_poa+"');");
        if (response.rowCount > 0) {
            callback(true, response.rows);
          } else {
            callback(false);
          }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

//Modificar plan estrategico
module.exports.ModificarPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE planes.planes SET plan_nombre='"+req.body.plan_nombre+"', plan_fecha_inicio='"+req.body.plan_fecha_inicio+"', plan_fecha_fin='"+req.body.plan_fecha_fin+"', plan_estado='"+req.body.plan_estado+"', plan_planest='"+req.body.plan_planest+"', plan_poa='"+req.body.plan_poa+"' WHERE plan_id='"+req.body.plan_id+"';");
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

  //Eliminar plan estrategico
module.exports.EliminarPlan = async function (req, callback){
    try {
      const response = await pool.pool.query("update planes.planes set plan_estado=0 WHERE plan_id='"+req.body.plan_id+"';");
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
  