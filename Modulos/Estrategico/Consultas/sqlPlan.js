const pool = require("../Config/conBaseDatos");

//Listar plan estrategico completos
module.exports.ListarPlanes = async function (req, callback){
    try {
        var response, planes=[];
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when plan_estado=1 then 'Activo' when plan_estado=0 then 'Inactivo' when plan_estado=2 then 'Aprobado' end as estadonombre FROM estrategico.plan_estrategico order by plan_id;");
        }else{
            response = await pool.pool.query("SELECT *, case when plan_estado=1 then 'Activo' when plan_estado=0 then 'Inactivo' when plan_estado=2 then 'Aprobado' end as estadonombre  FROM estrategico.plan_estrategico where plan_dependencia='"+req.body.codigo+"' order by plan_id;");
        }
        if(response.rowCount>0){
            for(let plan of response.rows){
              const response2=await pool.pool.query("SELECT * from estrategico.archivo_plan where arch_plan='"+plan.plan_id+"' and arch_estado=1;");
              if(response2.rowCount>0){
                planes.push({"plan":plan, "archivo":response2.rows});
              }else{
                planes.push({"plan":plan, "archivo":[]});
              }
            }
            callback(true, planes);
        }else{
            callback(false);
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}

//Listar plan estrategico completos
module.exports.ListarPlanesActivos = async function (req, callback){
  try {
      var response;
      if(req.body.tipo==0){
        response = await pool.pool.query("SELECT * FROM estrategico.plan_estrategico where plan_estado=2 order by plan_id;");
      }else if(req.body.tipo==1){
          response = await pool.pool.query("SELECT * FROM estrategico.plan_estrategico where plan_estado=1 or plan_estado=2 order by plan_id;");
      }else{
          response = await pool.pool.query("SELECT * FROM estrategico.plan_estrategico where plan_dependencia='"+req.body.codigo+"' and (plan_estado=1 or plan_estado=2) order by plan_id;");
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
        const response = await pool.pool.query("SELECT * FROM estrategico.plan_estrategico where plan_id='"+req+"' and (plan_estado=1 or plan_estado=2);");
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
        const response = await pool.pool.query("select * from estrategico.f_ingresarplan('"+req.body.plan_nombre+"', '"+req.body.plan_fecha_inicio+"', '"+req.body.plan_fecha_fin+"', '"+req.body.plan_vision+"', '"+req.body.plan_mision+"', '"+req.body.plan_dependencia+"', '"+req.body.plan_anio+"', '"+req.body.plan_planid+"');");
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
        const response = await pool.pool.query("UPDATE estrategico.plan_estrategico SET plan_nombre='"+req.body.plan_nombre+"', plan_fecha_inicio='"+req.body.plan_fecha_inicio+"', plan_fecha_fin='"+req.body.plan_fecha_fin+"', plan_vision='"+req.body.plan_vision+"', plan_mision='"+req.body.plan_mision+"', plan_anio='"+req.body.plan_anio+"', plan_estado='"+req.body.plan_estado+"' WHERE plan_id='"+req.body.plan_id+"';");
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
        const response = await pool.pool.query("select exists(select * from estrategico.estructura where est_plan='"+req.body.plan_id+"');");
        if(response.rowCount>0){
          if(response.rows[0].exists){
            const response2 = await pool.pool.query("update estrategico.plan_estrategico set plan_estado=0 WHERE plan_id='"+req.body.plan_id+"';");
            if (response2.rowCount > 0) {
                callback(true);
              } else {
                callback(false);
              }
          }else{
            const response2 = await pool.pool.query("DELETE FROM estrategico.plan_estrategico WHERE plan_id='"+req.body.plan_id+"';");
            if (response2.rowCount > 0) {
                callback(true);
              } else {
                callback(false);
              }
          }
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}
  