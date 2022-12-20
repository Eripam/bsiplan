const pool = require("../Config/conBaseDatos");

//Lista Usuarios que se encuentren registrados en el sistema
module.exports.Usuarios = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when per_estado=1 then 'Activo' when per_estado=0 then 'Inactivo' end per_estado_nombre from seguridad.persona;"
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

//Ingreso de usuarios 
module.exports.IngresarUsuario = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "INSERT INTO seguridad.persona(per_codigo, per_cedula, per_nombres, per_apellidos, per_email, per_estado) VALUES ('" +
        req.body.per_codigo +"', '" +req.body.per_cedula +"', '" +req.body.per_nombres +"', '" +req.body.per_apellidos +"', '" +req.body.per_email +"', 1);"
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

//Modificación de usuarios, solo email y estado por medio del código
module.exports.ModificarUsuario = async function (req, callback) {
  try {
    const response = await pool.pool.query("UPDATE seguridad.persona set per_email='" +
    req.body.per_email +"', per_estado='" +req.body.per_estado +"'  where per_codigo='" +req.body.per_codigo +"';");
    if(response.rowCount>0){
      callback(true);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Lista Usuarios activos
module.exports.UsuariosActivos = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select per_codigo, per_cedula, concat(per_nombres, ' ',per_apellidos) as per_nombre, per_estado from seguridad.persona where per_estado=1;"
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