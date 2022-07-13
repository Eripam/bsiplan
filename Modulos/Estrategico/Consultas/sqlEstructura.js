const pool = require("../Config/conBaseDatos");

//Listar estructura
module.exports.ListarEstructura = async function (req, callback){
    try {
      var response;
        if(req.body.tipo==1){
          response = await pool.pool.query("SELECT *, case when est_estado=1 then 'Activo' when est_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.estructura where est_plan='"+req.body.codigo+"' order by est_id;");
        }else{
          response = await pool.pool.query("SELECT *, case when est.est_orden=1 then true when est.est_orden<>1 and (select exists(select * from estrategico.estructura_plan inner join estrategico.estructura as es on eplan_estructura=es.est_id where es.est_orden=est.est_orden-1 and eplan_estado=1)) then true else false end existe FROM estrategico.estructura as est where est.est_plan='"+req.body.codigo+"' and est.est_estado=1 order by est.est_orden, est.est_id;");
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

//Ingresar estructura
module.exports.IngresarEstructura = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.estructura(est_id, est_nombre, est_plan, est_codigo, est_componente, est_politicas, est_eje, est_planes, est_orden) VALUES ((select * from estrategico.f_codigo_estrategico(2)), '"+req.body.est_nombre+"', '"+req.body.est_plan+"', '"+req.body.est_codigo+"', '"+req.body.est_componente+"', '"+req.body.est_politicas+"', '"+req.body.est_eje+"', '"+req.body.est_planes+"', '"+req.body.est_orden+"');");
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
        const response = await pool.pool.query("UPDATE estrategico.estructura SET est_nombre='"+req.body.est_nombre+"', est_codigo='"+req.body.est_codigo+"', est_estado='"+req.body.est_estado+"', est_componente='"+req.body.est_componente+"', est_politicas='"+req.body.est_politicas+"', est_eje='"+req.body.est_eje+"', est_planes='"+req.body.est_planes+"', est_orden='"+req.body.est_orden+"' WHERE est_id='"+req.body.est_id+"';");
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
        const response = await pool.pool.query("DELETE FROM estrategico.estructura WHERE est_id='"+req.body.est_id+"';");
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