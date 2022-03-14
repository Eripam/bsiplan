const pool= require('../Config/conBaseDatos');


//Lista criterios descripción que se encuentren registrados en el sistema
module.exports.CriteriosDescripcion = async function (req, callback) {
    var criterio=[];
    try {

        const response = await pool.pool.query(
            "select * from prospectiva.criterio_descripcion inner join prospectiva.criterio on cdes_criterio=cri_id where cri_prospectiva='"+req.body.cri_prospectiva+"' and cdes_estado=1 order by cdes_id;"
          );
        if (response.rowCount > 0) {
          for(var i=0; i<response.rowCount; i++){
            const responseC= await pool.pool.query("select * from prospectiva.consecuencia where con_estado=1 and con_cdes='"+response.rows[i].cdes_id+"' order by con_id;");
            const responseA= await pool.pool.query("select * from prospectiva.accion where acc_estado=1 and acc_cdes='"+response.rows[i].cdes_id+"' order by acc_id;");
            const responseU= await pool.pool.query("select * from prospectiva.utopia where uto_estado=1 and uto_cridescripcion='"+response.rows[i].cdes_id+"' order by uto_id;");
            criterio.push({"cdes_id":response.rows[i].cdes_id, "cdes_criterio":response.rows[i].cdes_criterio, "cdes_cdesid":response.rows[i].cdes_cdesid, "cdes_descripcion":response.rows[i].cdes_descripcion, "consecuencias":responseC.rows,"acciones":responseA.rows, "utopias":responseU.rows});
          }
          callback(true, criterio);
        } else {
          callback(false);
        }
    } catch (error) {
      console.log("Error: " + error.stack);
    }
  };

//Ingreso de Criterios descripcion 
module.exports.IngresarCriteriosDes = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "INSERT INTO prospectiva.criterio_descripcion(cdes_id, cdes_criterio, cdes_descripcion) VALUES ((select * from prospectiva.f_codigo_prospectiva(4)), " +req.body.cdes_criterio +", '"+req.body.cdes_descripcion+"');"
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

//Ingreso de Consecuencias descripcion 
 module.exports.IngresarConsecuencias = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "INSERT INTO prospectiva.consecuencia(con_id, con_cdes, con_descripcion) VALUES ((select * from prospectiva.f_codigo_prospectiva(5)), " +req.body.con_cdes +", '"+req.body.con_descripcion+"');"
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

//Ingreso de Acciones
module.exports.IngresarAcciones = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "INSERT INTO prospectiva.accion(acc_id, acc_cdes, acc_descripcion) VALUES ((select * from prospectiva.f_codigo_prospectiva(6)), " +req.body.acc_cdes +", '"+req.body.acc_descripcion+"');"
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

//Ingreso de utopias
module.exports.IngresarUtopias = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO prospectiva.utopia(uto_id, uto_cridescripcion ,uto_descripcion) VALUES ((select * from prospectiva.f_codigo_prospectiva(7)), " +req.body.uto_cridescripcion +", '"+req.body.uto_descripcion+"');"
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

//Modificar de Criterios descripcion 
module.exports.ModificarCriteriosDes = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "UPDATE prospectiva.criterio_descripcion SET cdes_descripcion='"+req.body.cdes_descripcion+"' where cdes_id=" +req.body.cdes_id +";"
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
  
 //Modificar de Consecuencia 
 module.exports.ModificarConsecuencia = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "UPDATE prospectiva.consecuencia SET con_descripcion='"+req.body.con_descripcion+"' where con_id=" +req.body.con_id +";"
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

 //Modificar de Accions 
 module.exports.ModificarAccion = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "UPDATE prospectiva.accion SET acc_descripcion='"+req.body.acc_descripcion+"' where acc_id=" +req.body.acc_id +";"
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

 //Modificar de Utopias 
 module.exports.ModificarUtopias = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "UPDATE prospectiva.utopia SET uto_descripcion='"+req.body.uto_descripcion+"' where uto_id=" +req.body.uto_id +";"
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

//Eliminación de criterio descripción 
module.exports.EliminarCriterioD = async function (req, callback) {
  try {
    var response;
    if(req.body.tipo==1){
      response = await pool.pool.query(
        "DELETE FROM prospectiva.criterio_descripcion where cdes_id='"+req.body.codigo+"';"
      );
    }else{
      response = await pool.pool.query(
        "UPDATE prospectiva.criterio_descripcion SET cdes_estado=0 where cdes_id=" +req.body.codigo +";"
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

 //Validacion de eliminación de criterios descripción 
 module.exports.ValidacionEliminacion = async function (req, callback) {
  try {
      const response = await pool.pool.query("select exists(select * from prospectiva.criterio_descripcion where cdes_cdesid='"+req.body.codigo+"');");
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

 //Validacion de eliminación de consecuencias 
 module.exports.ValidacionEliminacionCons = async function (req, callback) {
  try {
      const response = await pool.pool.query("select exists(select * from prospectiva.consecuencia where con_conid='"+req.body.codigo+"');");
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

 //Validacion de eliminación acciones 
 module.exports.ValidacionEliminacionAcc = async function (req, callback) {
  try {
      const response = await pool.pool.query("select exists(select * from prospectiva.accion where acc_accionid='"+req.body.codigo+"');");
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
};

//Eliminar consecuencias
module.exports.EliminarConsecuencia = async function (req, callback) {
  try {
      var response;
      if(req.body.tipo==1){
        response = await pool.pool.query(
          "DELETE FROM prospectiva.consecuencia where con_id='"+req.body.codigo+"';"
        );
      }else{
        response = await pool.pool.query(
          "UPDATE prospectiva.consecuencia set con_estado=0 where con_id='"+req.body.codigo+"';"
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

//Eliminar Acciones
module.exports.EliminarAccion = async function (req, callback) {
  try {
      var response;
      if(req.body.tipo==1){
        response = await pool.pool.query(
          "DELETE FROM prospectiva.accion where acc_id='"+req.body.codigo+"';"
        );
      }else{
        response = await pool.pool.query(
          "UPDATE prospectiva.accion SET acc_estado=0 where acc_id='"+req.body.codigo+"';"
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

//Eliminar Utopia
module.exports.EliminarUtopia = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "DELETE FROM prospectiva.utopia where uto_id='"+req.body.uto_id+"';"
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