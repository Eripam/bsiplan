const pool = require("../Config/conBaseDatos");

//Listar ejes
module.exports.ListarEjes = async function (req, callback){
    try {
          var response;
          if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when eje_estado=1 then 'Activo' when eje_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.eje_estrategico where eje_plan='"+req.body.codigo+"' order by eje_id;");
          }else{
            response = await pool.pool.query("SELECT * FROM estrategico.eje_estrategico where eje_plan='"+req.body.codigo+"' and eje_estado=1 order by eje_id;");
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

//Ingresar eje
module.exports.IngresarEje = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.eje_estrategico(eje_id, eje_nombre, eje_plan) VALUES ((select * from estrategico.f_codigo_estrategico(4)), '"+req.body.eje_nombre+"', '"+req.body.eje_plan+"');");
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

//Modificar eje
module.exports.ModificarEje = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.eje_estrategico SET eje_nombre='"+req.body.eje_nombre+"', eje_estado='"+req.body.eje_estado+"' WHERE eje_id='"+req.body.eje_id+"';");
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

  //Eliminar eje
module.exports.EliminarEje = async function (req, callback){
    try {
        const response = await pool.pool.query("DELETE FROM estrategico.eje_estrategico WHERE eje_id='"+req.body.eje_id+"';");
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