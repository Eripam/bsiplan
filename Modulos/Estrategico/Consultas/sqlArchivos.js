const pool = require("../Config/conBaseDatos");

//Listar archivos
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

//Codigo siguiente
module.exports.CodigoArchivo = async function (req, callback){
    try {
        const response = await pool.pool.query("select * from estrategico.f_codigo_estrategico(10);");
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

//Ingresar archivo
module.exports.IngresarArchivo = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.archivo_plan(arch_id, arch_nombre, arch_archivo, arch_ruta, arch_plan) VALUES ((select * from estrategico.f_codigo_estrategico(10)), '"+req.body.arch_nombre+"', '"+req.body.arch_archivo+"', '"+req.body.arch_ruta+"','"+req.body.arch_plan+"');");
        if (response.rowCount > 0) {
            const response2=await pool.pool.query("update estrategico.plan_estrategico set plan_estado=2 where plan_id='"+req.body.arch_plan+"';");
            if(response2.rowCount>0){
                callback(true);
            }else{
                callback(false);
            }
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