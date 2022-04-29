const pool = require("../Config/conBaseDatos");

//Lista login
module.exports.Login = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from (select * from seguridad.vlogin where rpe_persona like '"+req.body.perid+"' limit 1)as con inner join seguridad.rol_opcion on rpe_rol=rop_rol join seguridad.opciones on rop_opcion=opc_codigo join seguridad.padre_opcion on rop_padreop=pop_codigo order by rop_padreop, rop_opcion limit 1;");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista login correo
module.exports.LoginCorreo = async function (req, callback) {
  try {
    var response;
    if(req.body.clientName=="Centralizada"){
      response = await pool.pool.query("select * from (select * from seguridad.vlogin where per_cedula like '"+req.body.perid+"' limit 1)as con inner join seguridad.rol_opcion on rpe_rol=rop_rol join seguridad.opciones on rop_opcion=opc_codigo join seguridad.padre_opcion on rop_padreop=pop_codigo order by rop_padreop, rop_opcion limit 1;");
    }else{
      response = await pool.pool.query("select * from (select * from seguridad.vlogin where per_email like '"+req.body.perid+"' limit 1)as con inner join seguridad.rol_opcion on rpe_rol=rop_rol join seguridad.opciones on rop_opcion=opc_codigo join seguridad.padre_opcion on rop_padreop=pop_codigo order by rop_padreop, rop_opcion limit 1;");
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

//Lista login rol, dependencia, persona
module.exports.LoginRolDep = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from (select * from seguridad.vlogin where rpe_persona like '"+req.body.perid+"' and rpe_rol='"+req.body.rol+"' and rpe_dependencia='"+req.body.dependencia+"' limit 1)as con inner join seguridad.rol_opcion on rpe_rol=rop_rol join seguridad.opciones on rop_opcion=opc_codigo join seguridad.padre_opcion on rop_padreop=pop_codigo order by rop_padreop, rop_opcion limit 1;");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista perfiles
module.exports.ListaPerfil = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from seguridad.vlogin where rpe_persona like '"+req.body.perid+"';");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};


//Esta registrado ese usuario para acceder a la pagina
module.exports.RegistradoPagina = async function (req, callback) {
  try {
    const response = await pool.pool.query("select exists(select * from seguridad.vLogin inner join seguridad.rol_opcion on rpe_rol=rop_rol where rpe_persona like '"+req.body.rpe_persona+"' and rpe_rol='"+req.body.rpe_rol+"' and rop_opcion='"+req.body.rop_opcion+"' and rpe_dependencia='"+req.body.rpe_dependencia+"');");
    if (response.rows[0].exists) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista credenciales correo
module.exports.DatosCorreoNube = async function (req, callback) {
  try {
    const response = await pool.pool.query("SELECT * FROM seguridad.credencialtoken where estado=1 and usuario='"+req.body.usuario+"' and clave='"+req.body.clave+"';");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};
