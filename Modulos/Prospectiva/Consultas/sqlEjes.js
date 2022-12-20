const pool = require("../Config/conBaseDatos");

//Lista tipo ejes estratégicos que se encuentren registrados en el sistema
module.exports.TipoEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "select * from prospectiva.tipo_eje where teje_prospectiva='" +
        req.body.codigo +
        "';"
    );
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      const response2 = await pool.pool.query(
        "select * from prospectiva.tipo_eje where teje_prospectiva=(select pro_proid from prospectiva.prospectiva where pro_id='" +
          req.body.codigo +
          "')"
      );
      if (response2.rowCount > 0) {
        callback(true, response2.rows);
      } else {
        callback(false);
      }
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista ejes estratégicos que se encuentren registrados en el sistema
module.exports.EjesEstrategico = async function (req, callback) {
  var acciones=[];
  try {
    const response = await pool.pool.query(
      "select * from prospectiva.ejes_estrategicos inner join prospectiva.tipo_eje on eje_teje=teje_id where eje_prospectiva='" +
        req.body.codigo +
        "' and eje_estado=1;"
    );
    if (response.rowCount > 0) {
      for(var i=0; i<response.rowCount; i++){
        const responseA=await pool.pool.query("select * from prospectiva.accion_ejes inner join prospectiva.accion on aeje_accion=acc_id where aeje_eje='"+response.rows[i].eje_id+"';");
        acciones.push({"eje_id":response.rows[i].eje_id, "eje_teje":response.rows[i].eje_teje, "eje_prospectiva":response.rows[i].eje_prospectiva, "eje_nombre":response.rows[i].eje_nombre, "eje_descripcion":response.rows[i].eje_descripcion, "eje_microescenario":response.rows[i].eje_microescenario, "eje_codigo":response.rows[i].eje_codigo, "teje_nombre":response.rows[i].teje_nombre, "acciones":responseA.rows});
      }
      callback(true, acciones);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Ingreso de tipo de eje
module.exports.IngresarTipoEje = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "INSERT INTO prospectiva.tipo_eje(teje_id, teje_nombre, teje_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(10)), '" +
        req.body.teje_nombre +
        "', '" +
        req.body.teje_prospectiva +
        "');"
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

//Código de eje
async function codigoEje(){
  try {
    const response=await pool.pool.query("select * from prospectiva.f_codigo_prospectiva(11)");
    if (response.rowCount > 0) {
      return(response.rows[0]);
    } else {
      return(0);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
}

//Ingresar ejes estratégicos
module.exports.IngresarEjes = async function (req, callback) {
  var codigo=await codigoEje();
  var contador=0;
  try {
    const response = await pool.pool.query(
      "INSERT INTO prospectiva.ejes_estrategicos(eje_id, eje_teje, eje_prospectiva, eje_nombre, eje_descripcion, eje_microescenario, eje_codigo) VALUES ("+codigo.f_codigo_prospectiva+", '" +
        req.body.eje_teje +
        "', '" +
        req.body.eje_prospectiva +
        "', '" +
        req.body.eje_nombre +
        "', '" +
        req.body.eje_descripcion +
        "', '" +
        req.body.eje_microescenario +
        "',0);"
    );
    if (response.rowCount > 0) {
      for(let accion of req.body.eje_accion){
      try {
        const response = await pool.pool.query(
          "INSERT INTO prospectiva.accion_ejes(aeje_id, aeje_accion, aeje_eje) VALUES ((select * from prospectiva.f_codigo_prospectiva(12)), '" +
            accion +
            "', '" +
            codigo.f_codigo_prospectiva +
            "');");
          if(response.rowCount>0){
            contador++;
          } 
      } catch (error) {
        const response = await pool.pool.query(
          "DELETE from prospectiva.ejes_estrategicos where eje_id='" +
            codigo.f_codigo_prospectiva +
            "';"
        );
      }
      }
      if(contador==req.body.eje_accion.length){
        callback(true);
      }else{
        callback(false);
      }
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Modificar ejes estratégicos
module.exports.ModificarEjes = async function (req, callback) {
  var contador=0;
  try {
    const response = await pool.pool.query(
      "Update prospectiva.ejes_estrategicos set eje_teje='" +
        req.body.eje_teje +
        "',eje_prospectiva='" +
        req.body.eje_prospectiva +
        "',eje_nombre='" +
        req.body.eje_nombre +
        "',eje_descripcion= '" +
        req.body.eje_descripcion +
        "',eje_microescenario='" +
        req.body.eje_microescenario +
        "' where eje_id='" +
        req.body.eje_id +
        "';"
    );
    if (response.rowCount > 0) {
      const responseE=await pool.pool.query("DELETE from prospectiva.accion_ejes where aeje_eje='"+req.body.eje_id+"'");
      if(responseE.rowCount>0){
        for(let accion of req.body.eje_accion){
          const response = await pool.pool.query("INSERT INTO prospectiva.accion_ejes(aeje_id, aeje_accion, aeje_eje) VALUES ((select * from prospectiva.f_codigo_prospectiva(12)), '" +
                accion +"', '" +req.body.eje_id +"');");
          if(response.rowCount>0){
            contador++;
          } 
        }
      }
      if(contador==req.body.eje_accion.length){
         callback(true);
      }else{
         callback(false);
      }
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Modificar tipo ejes estratégicos
module.exports.ModificarTEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "Update prospectiva.tipo_eje set teje_nombre='" +
        req.body.teje_nombre +
        "' where teje_id='" +
        req.body.teje_id +
        "';"
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

//Eliminar ejes estratégicos
module.exports.EliminarEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "DELETE from prospectiva.ejes_estrategicos where eje_id='" +
        req.body.eje_id +
        "';"
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

//Eliminar tipo ejes estratégicos
module.exports.EliminarTipoEjes = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "DELETE from prospectiva.tipo_eje where teje_id='" +
        req.body.teje_id +
        "';"
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
