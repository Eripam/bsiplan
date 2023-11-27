const pool = require("../Config/conBaseDatos");

//Listar estructura
module.exports.ListarEstructura = async function (req, callback){
    try {
      var response;
        if(req.body.tipo==1){
          response = await pool.pool.query("SELECT *, case when est_estado=1 then 'Activo' when est_estado=0 then 'Inactivo' end as estadonombre FROM planes.estructura where est_plan='"+req.body.codigo+"' order by est_id;");
        }else{
          response = await pool.pool.query("SELECT *, case when est.est_orden=1 then true when est.est_orden<>1 and (select exists(select * from planes.estructura_planes inner join planes.estructura as es on eplan_estructura=es.est_id where es.est_orden=est.est_orden-1 and eplan_estado=1)) then true else false end existe FROM planes.estructura as est where est.est_plan='"+req.body.codigo+"' and est.est_estado=1 order by est.est_orden, est.est_id;");
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

//Listar maximo
module.exports.MaximoEstructura = async function(req, callback){
  try {
    const response=await pool.pool.query("select max(est_orden) from planes.estructura where est_plan='"+req.body.codigo+"' and est_estado=1;");
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
}

//Ingresar estructura
module.exports.IngresarEstructura = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO planes.estructura(est_id, est_nombre, est_plan, est_codigo, est_orden, est_muestra) VALUES ((select * from planes.f_codigo_planes(2)), '"+req.body.est_nombre+"', '"+req.body.est_plan+"', '"+req.body.est_codigo+"', '"+req.body.est_orden+"', '"+req.body.est_muestra+"');");
        
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

//Modificar estructura
module.exports.ModificarEstructura = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE planes.estructura SET est_nombre='"+req.body.est_nombre+"', est_codigo='"+req.body.est_codigo+"', est_estado='"+req.body.est_estado+"',  est_orden='"+req.body.est_orden+"', est_muestra='"+req.body.est_muestra+"' WHERE est_id='"+req.body.est_id+"';");
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

//Eliminar estructura
module.exports.EliminarEstructura = async function (req, callback){
    try {
        const response = await pool.pool.query("DELETE FROM planes.estructura WHERE est_id='"+req.body.est_id+"';");
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