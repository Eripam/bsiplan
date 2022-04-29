const pool= require('../Config/conBaseDatos');

//Lista tipo arbol
module.exports.TipoArbol = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from prospectiva.tipo_arbol where tarb_prospectiva='"+req.body.codigo+"' order by tarb_id");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista acciones tabuladas
module.exports.ListaArbol = async function (req, callback) {
    try {
      const response = await pool.pool.query("select * from prospectiva.estructura_arbol where estr_prospectiva='"+req.body.codigo+"' order by estr_id;");
      if (response.rowCount > 0) {
        callback(true, response.rows);
      } else {
        callback(false);
      }
    } catch (error) {
      console.log("Error: " + error.stack);
    }
  };

//Ingreso de árbol 
module.exports.IngresarArbol = async function (req, callback) {
    try {
        var response;
        if(req.body.estr_accion==0){
            response = await pool.pool.query("INSERT INTO prospectiva.estructura_arbol(estr_id, estr_tipo, estr_descripcion, estr_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(9)), '"+req.body.estr_tipo+"', '"+req.body.estr_descripcion+"', '"+req.body.estr_prospectiva+"');");
        }else{
            response = await pool.pool.query("INSERT INTO prospectiva.estructura_arbol(estr_id, estr_tipo, estr_descripcion, estr_accion, estr_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(9)), '"+req.body.estr_tipo+"', '"+req.body.estr_descripcion+"', '"+req.body.estr_accion+"', '"+req.body.estr_prospectiva+"');");
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

//Modificar de árbol 
module.exports.ModificarArbol = async function (req, callback) {
  try {
      const response = await pool.pool.query("update prospectiva.estructura_arbol set estr_descripcion='"+req.body.estr_descripcion+"' where estr_id='"+req.body.estr_id+"';");
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

//Eliminar de árbol 
module.exports.EliminarArbol = async function (req, callback) {
  try {
      const response = await pool.pool.query("DELETE from prospectiva.estructura_arbol where estr_accion='"+req.body.estr_accion+"' and estr_prospectiva='"+req.body.estr_prospectiva+"';");
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

//Eliminar de estructura árbol
module.exports.EliminarArbolID = async function (req, callback) {
  try {
      const response = await pool.pool.query("DELETE from prospectiva.estructura_arbol where estr_id='"+req.body.estr_id+"';");
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

//Validar ingreso de árbol 
module.exports.ValidarArbol = async function (req, callback) {
  try {
      const response = await pool.pool.query("select exists(select * from prospectiva.estructura_arbol where estr_accion='"+req.body.estr_accion+"')");
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
