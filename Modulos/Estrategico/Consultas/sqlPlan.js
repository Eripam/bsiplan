const pool = require("../Config/conBaseDatos");

//Listar plan estrategico completos
module.exports.ListarPlanes = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when plan_estado=1 then 'Activo' when plan_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.plan_estrategico;");
        }else{
            response = await pool.pool.query("SELECT *, case when plan_estado=1 then 'Activo' when plan_estado=0 then 'Inactivo' end as estadonombre  FROM estrategico.plan_estrategico where plan_dependencia='"+req.body.codigo+"';");
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

//Listar plan estrategico por dependencias
module.exports.ListarPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("SELECT * FROM estrategico.plan_estrategico where plan_id='"+req+"' and plan_estado=1;");
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

//Ingresar plan estrategico
module.exports.IngresarPlan = async function (req, callback){
    try {
        var response;
        if(req.body.tipo=1){
            response = await pool.pool.query("INSERT INTO estrategico.plan_estrategico(plan_id, plan_nombre, plan_fecha_inicio, plan_fecha_fin, plan_vision, plan_mision, plan_dependencia, plan_anio) VALUES ((select * from estrategico.f_codigo_estrategico(1)), '"+req.body.plan_nombre+"', '"+req.body.plan_fecha_inicio+"', '"+req.body.plan_fecha_fin+"', '"+req.body.plan_vision+"', '"+req.body.plan_mision+"', '"+req.body.plan_dependencia+"', '"+req.body.plan_anio+"');");
        }else{
            response = await pool.pool.query("INSERT INTO estrategico.plan_estrategico(plan_id, plan_nombre, plan_fecha_inicio, plan_fecha_fin, plan_vision, plan_mision, plan_dependencia, plan_anio, plan_planid) VALUES ((select * from estrategico.f_codigo_estrategico(1)), '"+req.body.plan_nombre+"', '"+req.body.plan_fecha_inicio+"', '"+req.body.plan_fecha_fin+"', '"+req.body.plan_vision+"', '"+req.body.plan_mision+"', '"+req.body.plan_dependencia+"', '"+req.body.plan_anio+"', '"+req.body.plan_planid+"');");
        }
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

//Modificar plan estrategico
module.exports.ModificarPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.plan_estrategico SET plan_nombre='"+req.body.plan_nombre+"', plan_fecha_inicio='"+req.body.plan_fecha_inicio+"', plan_fecha_fin='"+req.body.plan_fecha_fin+"', plan_vision='"+req.body.plan_vision+"', plan_mision='"+req.body.plan_mision+"', plan_anio='"+req.body.plan_anio+"' WHERE plan_id='"+req.body.plan_id+"';");
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

  //Eliminar plan estrategico
module.exports.EliminarPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("DELETE FROM estrategico.plan_estrategico WHERE plan_id='"+req.body.plan_id+"';");
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
  