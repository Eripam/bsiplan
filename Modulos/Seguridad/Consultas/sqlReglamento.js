const pool = require("../Config/conBaseDatos");

//Lista de Reglamentos que se encuentren registrados en el sistema
module.exports.Reglamentos = async function (callback) {
  var archivos=[];
  try {
    const response = await pool.pool.query(
      "select *, CASE when reg_estado=1 then 'Activo' when reg_estado=0 then 'Inactivo' end reg_estado_nombre from seguridad.reglamento order by reg_codigo;"
    );
    if (response.rowCount > 0) {
      for(var i=0; i<response.rowCount; i++){
        const responseA= await pool.pool.query("select * from seguridad.reglamento_archivo where rar_reglamento="+response.rows[i].reg_codigo+";");
        archivos.push({"reg_codigo":response.rows[i].reg_codigo, "reg_nombre":response.rows[i].reg_nombre, "reg_fecha":response.rows[i].reg_fecha,"reg_estado":response.rows[i].reg_estado, "reg_estado_nombre":response.rows[i].reg_estado_nombre, "reg_archivos":responseA.rows});     
      }
      callback(true, archivos);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista de Reglamentos que se encuentren registrados en el sistema activos
module.exports.ReglamentoActivos = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.reglamento where reg_estado=1 order by reg_codigo;"
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

//Ingreso de Reglamento 
module.exports.IngresarReglamento = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.reglamento(reg_codigo, reg_nombre) VALUES ('"+req.body.reg_codigo+"', '" +req.body.reg_nombre +"');"
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

//Ingreso de Archivos Reglamento 
module.exports.IngresarArchivosReglamento = async function (reg_codigo, reg_nombre, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.reglamento_archivo(rar_reglamento, rar_nombre) VALUES ('"+reg_codigo+"', '" +reg_nombre +"');"
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

//Modificación de Reglamento 
module.exports.ModificarReglamento = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.reglamento SET reg_nombre='" +req.body.reg_nombre +"', reg_estado='"+req.body.reg_estado+"' where reg_codigo='" +req.body.reg_codigo +"';");
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

//Obtener el código maximo de reglamentos
module.exports.codigoR=async function (callback){
    try {
     const response = await pool.pool.query(`select * from seguridad.f_codigo_seguridad(6);`);
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
    } catch (error) {
      console.log("Error: " + error.stack);
    }
}

//Obtener el suma de archivos
module.exports.SumaArchivos=async function (codigo, callback){
  try {
   const response = await pool.pool.query('select count(rar_codigo) from seguridad.reglamento_archivo where rar_reglamento='+codigo+';');
    if (response.rowCount > 0) {
      callback(response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
}

//Eliminación de archivos
module.exports.EliminarArchivos = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "DELETE FROM seguridad.reglamento_archivo WHERE rar_nombre='" +req.body.rar_nombre +"' and rar_codigo='"+req.body.rar_codigo+"';");
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