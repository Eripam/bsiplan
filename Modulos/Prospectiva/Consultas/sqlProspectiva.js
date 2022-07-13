const pool = require("../Config/conBaseDatos");

//Lista prospectivas que se encuentren registrados en el sistema
module.exports.Prospectivas = async function (req, callback) {
  try {
    var response;
    if(req.body.codigo==1){
      response = await pool.pool.query(
        "select *, CASE when pro_estado=1 then 'Activo' when pro_estado=0 then 'Inactivo' when pro_estado=2 then 'Aprobado' end pro_estado_nombre, (select exists(select * from prospectiva.ejes_estrategicos where eje_prospectiva=pro_id and eje_estado=1)) as ejes, (select exists(select * from prospectiva.vision_mision where vmp_prospectiva=pro_id and vmp_estado=1)) as vm from prospectiva.prospectiva left join prospectiva.vision_mision on vmp_prospectiva=pro_id order by pro_id;"
      );
    }else{
      response = await pool.pool.query(
        "select *, CASE when pro_estado=1 then 'Activo' when pro_estado=0 then 'Inactivo' when pro_estado=2 then 'Aprobado' end pro_estado_nombre, (select exists(select * from prospectiva.ejes_estrategicos where eje_prospectiva=pro_id and eje_estado=1)) as ejes, (select exists(select * from prospectiva.vision_mision where vmp_prospectiva=pro_id and vmp_estado=1)) as vm from prospectiva.prospectiva left join prospectiva.vision_mision on vmp_prospectiva=pro_id where pro_dependencia='"+req.body.codigo+"' order by pro_id;"
      );
    }
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista prospectivas aprobadas que se encuentren registrados en el sistema
module.exports.ProspectivasAprobadas = async function (callback) {
  try {
    const response = await pool.pool.query(
        "select * from prospectiva.prospectiva where pro_estado=2 order by pro_id;"
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

//Lista prospectivas activa institucional
module.exports.ProspectivasExiste = async function (callback) {
  try {
    const response = await pool.pool.query("select exists(select * from prospectiva.prospectiva where pro_dependencia=1 and pro_estado=2);");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Código de prospectiva
async function codigoProspectiva(){
  try {
    const response=await pool.pool.query("select * from prospectiva.f_codigo_prospectiva(1)");
    if (response.rowCount > 0) {
      return(response.rows[0]);
    } else {
      return(0);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
}

//Ingreso de Prospectiva 
module.exports.IngresarProspectiva = async function (req, callback) {
  try {
      var codigo=await codigoProspectiva();
      const response = await pool.pool.query(
        "INSERT INTO prospectiva.prospectiva(pro_id, pro_proid, pro_nombre, pro_fi, pro_ff, pro_tipo, pro_dependencia) VALUES ('"+codigo.f_codigo_prospectiva+"', " +req.body.pro_proid +", '"+req.body.pro_nombre+"', '"+req.body.pro_fi+"', '"+req.body.pro_ff+"', '"+req.body.pro_tipo+"', '"+req.body.pro_dependencia+"');"
      );
      if (response.rowCount > 0) {
        if(req.body.pro_proid>0){
          const responseC= await pool.pool.query("select * from prospectiva.f_creacioncriterios('"+codigo.f_codigo_prospectiva+"');");
          if(responseC.rowCount>0 && responseC.rows[0].f_creacioncriterios=='Correcto'){
            callback(true);
          }else{
            callback(false);
          }
        }else{
          callback(true);
        }
      } else {
        callback(false);
      }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Ingreso de Prospectiva 
module.exports.ModificarProspectiva = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "UPDATE prospectiva.prospectiva SET pro_nombre='"+req.body.pro_nombre+"', pro_fi='"+req.body.pro_fi+"', pro_ff='"+req.body.pro_ff+"', pro_estado='"+req.body.pro_estado+"' where pro_id='"+req.body.pro_id+"';");
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

//Ingreso de Visión y Misión 
module.exports.IngresarVisionMision = async function (req, callback) {
  try {
    var response;
    if(req.body.vmp_microescenario==null){
      response = await pool.pool.query(
        "INSERT INTO prospectiva.vision_mision(vmp_id, vmp_vision, vmp_mision, vmp_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(13)), '" +req.body.vmp_vision +"', '"+req.body.vmp_mision+"', '"+req.body.vmp_prospectiva+"');"
      );
    }else{
      response = await pool.pool.query(
        "INSERT INTO prospectiva.vision_mision(vmp_id, vmp_vision, vmp_mision, vmp_microescenario, vmp_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(13)), '" +req.body.vmp_vision +"', '"+req.body.vmp_mision+"', '"+req.body.vmp_microescenario+"', '"+req.body.vmp_prospectiva+"');"
      );
    }
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

//Modificar de Visión y Misión 
module.exports.ModificarVisionMision = async function (req, callback) {
  try {
      var response;
      if(req.body.vmp_microescenario==null){
        response = await pool.pool.query(
          "UPDATE prospectiva.vision_mision SET vmp_vision='" +req.body.vmp_vision +"', vmp_mision='" +req.body.vmp_mision +"', vmp_prospectiva='"+req.body.vmp_prospectiva+"' where vmp_id='"+req.body.vmp_id+"';"
        );
      }else{
        response = await pool.pool.query(
          "UPDATE prospectiva.vision_mision SET vmp_vision='" +req.body.vmp_vision +"', vmp_mision='" +req.body.vmp_mision +"', vmp_microescenario='"+req.body.vmp_microescenario+"', vmp_prospectiva='"+req.body.vmp_prospectiva+"' where vmp_id='"+req.body.vmp_id+"';"
        );
      }
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