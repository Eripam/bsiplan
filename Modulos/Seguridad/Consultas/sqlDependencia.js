const pool = require("../Config/conBaseDatos");

//Lista tipo dependencia que se encuentren registrados en el sistema
module.exports.TipoDependencia = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when tde_estado=1 then 'Activo' when tde_estado=0 then 'Inactivo' end tde_estado_nombre from seguridad.tipo_dependencia order by tde_codigo;"
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

//Lista tipo dependencia que se encuentren registrados en el sistema con estado 1
module.exports.TipoDependenciaActivo = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.tipo_dependencia where tde_estado=1 order by tde_codigo;"
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

//Ingreso de tipo dependencia 
module.exports.IngresarTipoDependencia = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.tipo_dependencia(tde_codigo, tde_nombre) VALUES ((select * from seguridad.f_codigo_seguridad(2)), '" +req.body.tde_nombre +"');"
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

//Modificación de tipo dependencia 
module.exports.ModificarTipoDependencia = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.tipo_dependencia SET tde_nombre='" +req.body.tde_nombre +"', tde_estado='"+req.body.tde_estado+"' where tde_codigo='" +req.body.tde_codigo +"';");
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
  
//Lista dependencia que se encuentren registrados en el sistema
module.exports.Dependencia = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select dep.dep_codigo as dep_codigo, dep.dep_nombre as dep_nombre, dep.dep_alias as dep_alias, dep.dep_estado as dep_estado, dep.dep_tipo as dep_tipo, tde_nombre, d.dep_codigo as dep_codcodigo, d.dep_nombre as dep_nombre_padre, d.dep_alias as dep_alias_p, (select CASE when dep.dep_estado=1 then 'Activo' when dep.dep_estado=0 then 'Inactivo' end dep_estado_nombre), (select CASE when dep.dep_codcodigo is null or d.dep_alias='ESPOCH' then dep.dep_nombre when dep.dep_codcodigo<>1 then d.dep_nombre end dep_nombre_p) from seguridad.dependencia as dep left join seguridad.dependencia as d on dep.dep_codcodigo=d.dep_codigo inner join seguridad.tipo_dependencia on dep.dep_tipo=tde_codigo where tde_estado=1 order by dep.dep_codigo;"
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

//Lista dependencia que se encuentren activas
module.exports.DependenciaAc = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.dependencia where dep_estado=1 order by dep_codigo"
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

//Lista nombre dependencia por código
module.exports.DependenciaCodigo = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.dependencia where dep_estado=1 and dep_codigo='"+req.body.dep_codigo+"';"
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


//Lista dependencia facultades y unidades administrativas
module.exports.DependenciaFacAdm = async function (req, callback) {
  try {
    let response;
    if(req.body.tipo==1){
      response = await pool.pool.query(
        "select * from seguridad.dependencia where dep_estado=1 and (dep_tipo=2 or dep_tipo=4 or dep_tipo=5) order by dep_codigo"
      );
    }else{
      response = await pool.pool.query(
        "select * from seguridad.dependencia where dep_estado=1 and dep_codigo<>1 order by dep_codigo"
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

//Lista dependencia que se encuentren activas y pertencezcan a una determinada
module.exports.DependenciaPert = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "select * from seguridad.dependencia where dep_estado=1 and (dep_codcodigo='"+req.body.codigo+"' or dep_codigo='"+req.body.codigo+"') order by dep_codigo"
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

//Ingreso de dependencia 
module.exports.IngresarDependencia = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.dependencia(dep_codigo, dep_nombre, dep_alias, dep_tipo, dep_codcodigo) VALUES ((select * from seguridad.f_codigo_seguridad(3)), '" +req.body.dep_nombre +"', '"+req.body.dep_alias+"', '"+req.body.dep_tipo+"', '"+req.body.dep_codcodigo+"');"
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

//Modificación de dependencia 
module.exports.ModificarDependencia = async function (req, callback) {
  try {
    const response = await pool.pool.query(
      "UPDATE seguridad.dependencia SET dep_nombre='" +req.body.dep_nombre +"', dep_estado='"+req.body.dep_estado+"', dep_codcodigo='"+req.body.dep_codcodigo+"', dep_alias='"+req.body.dep_alias+"', dep_tipo='"+req.body.dep_tipo+"' where dep_codigo='" +req.body.dep_codigo +"';");
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