const pool = require("../Seguridad/Config/conBaseDatos");

//Ingresar envio email
module.exports.EnviarEmailGeneral = async function (req, callback) {
  try {
    const response1 = await pool.pool.query("select exists(select * from seguridad.envio_email where enem_tipo='"+req.body.enem_tipo+"' and enem_modulo='"+req.body.enem_modulo+"' and enem_procesado=false and enem_dependencia='"+req.body.enem_dependencia+"' and enem_rol='"+req.body.enem_rol+"');");
    if(response1.rowCount>0){
      if(response1.rows[0].exists){
        const response2=await pool.pool.query("DELETE from seguridad.envio_email where enem_dependencia='"+req.body.enem_dependencia+"' and enem_rol='"+req.body.enem_rol+"' and enem_modulo='"+req.body.enem_modulo+"' and enem_tipo='"+req.body.enem_tipo+"';")
        if(response2.rowCount>0){
          const response = await pool.pool.query(
            "INSERT INTO seguridad.envio_email(enem_dependencia, enem_rol, enem_observacion, enem_modulo, enem_tipo)VALUES ('"+req.body.enem_dependencia+"', '"+req.body.enem_rol+"', '"+req.body.enem_observacion+"', '"+req.body.enem_modulo+"', '"+req.body.enem_tipo+"');");
      
          if (response.rowCount > 0) {
            callback(true, response.rows);
          } else {
            callback(false);
          }
        }
      }else{
        const response = await pool.pool.query(
          "INSERT INTO seguridad.envio_email(enem_dependencia, enem_rol, enem_observacion, enem_modulo, enem_tipo)VALUES ('"+req.body.enem_dependencia+"', '"+req.body.enem_rol+"', '"+req.body.enem_observacion+"', '"+req.body.enem_modulo+"', '"+req.body.enem_tipo+"');");
     
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
      }
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};