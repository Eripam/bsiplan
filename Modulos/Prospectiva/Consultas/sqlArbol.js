const pool= require('../Config/conBaseDatos');

//Lista tipo arbol
module.exports.TipoArbol = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from prospectiva.tipo_arbol where tarb_prospectiva='"+req.body.codigo+"' and tarb_estado=1 order by tarb_id");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista tipo arbol
module.exports.TipoArbolC = async function (req, callback) {
  try {
    const response = await pool.pool.query("select *, CASE when tarb_estado=1 then 'Activo' when tarb_estado=0 then 'Inactivo' end tarb_estado_nombre from prospectiva.tipo_arbol where tarb_prospectiva='"+req.body.codigo+"' order by tarb_id");
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

//Ingreso de tipo de árbol 
module.exports.IngresarTipoArbol = async function (req, callback) {
  try {
      const response = await pool.pool.query("INSERT INTO prospectiva.tipo_arbol(tarb_id, tarb_nombre, tarb_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(15)), '"+req.body.tarb_nombre+"', '"+req.body.tarb_prospectiva+"');");
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

//Modificación de árbol 
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

//Modificar tipo de árbol 
module.exports.ModificarTipoArbol = async function (req, callback) {
  try {
      const response = await pool.pool.query("update prospectiva.tipo_arbol set tarb_nombre='"+req.body.tarb_nombre+"', tarb_estado='"+req.body.tarb_estado+"' where tarb_id='"+req.body.tarb_id+"';");
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

  //Eliminación de tipo de árbol 
  module.exports.EliminarTipoArbol = async function (req, callback) {
    try {
        const response = await pool.pool.query(
          "DELETE FROM prospectiva.tipo_arbol WHERE tarb_id='"+req.body.tarb_id+"';"
        );
        if (response.rowCount > 0) {
          callback(true);
        } else {
          callback(false);
        }
    } catch (error) {
      const response = await pool.pool.query(
        "UPDATE prospectiva.tipo_arbol SET tarb_estado=0 WHERE tarb_id='"+req.body.tarb_id+"';"
      );
      if (response.rowCount > 0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  };
