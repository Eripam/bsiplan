const pool = require("../Config/conBaseDatos");

//Lista prospectivas que se encuentren registrados en el sistema
module.exports.Prospectivas = async function (req, callback) {
  try {
    var response;
    if(req.body.codigo==1){
      response = await pool.pool.query(
        "select *, CASE when pro_estado=1 then 'Activo' when pro_estado=0 then 'Inactivo' end pro_estado_nombre from prospectiva.prospectiva order by pro_id;"
      );
    }else{
      response = await pool.pool.query(
        "select *, CASE when pro_estado=1 then 'Activo' when pro_estado=0 then 'Inactivo' end pro_estado_nombre from prospectiva.prospectiva where pro_dependencia='"+req.body.codigo+"' order by pro_id;"
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

//Ingreso de Prospectiva 
module.exports.IngresarProspectiva = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO prospectiva.prospectiva(pro_id, pro_proid, pro_nombre, pro_fi, pro_ff, pro_tipo, pro_dependencia) VALUES ((select * from prospectiva.f_codigo_prospectiva(1)), " +req.body.pro_proid +", '"+req.body.pro_nombre+"', '"+req.body.pro_fi+"', '"+req.body.pro_ff+"', '"+req.body.pro_tipo+"', '"+req.body.pro_dependencia+"');"
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