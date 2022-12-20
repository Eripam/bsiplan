const pool = require("../Config/conBaseDatos");

//Lista respuesta encuentren registrados en el sistema
module.exports.RespuestaCompleta = async function (req, callback) {
  try {
    const response = await pool.pool.query("select *, CASE when res_estado=1 then 'Activo' when res_estado=0 then 'Inactivo' end res_estado_nombre from prospectiva.respuesta where res_prospectiva='"+req.body.codigo+"' order by res_id");
    
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista respuesta que se encuentren registrados en el sistema
module.exports.Respuesta = async function (req, callback) {
  try {
    const response = await pool.pool.query("select *, CASE when res_estado=1 then 'Activo' when res_estado=0 then 'Inactivo' end res_estado_nombre from prospectiva.respuesta where res_estado=1 and res_prospectiva='"+req.body.codigo+"' order by res_id");
    
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista tiempos para la evaluación
module.exports.Tiempo = async function (req, callback) {
  try {
    const response = await pool.pool.query("select * from prospectiva.tiempo where tiem_prospectiva='"+req.body.prospectiva+"';");
    
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Existe evaluación enviada 
module.exports.EncuestaEnviada=async function(req, callback){
  try {
    const response = await pool.pool.query("select * from prospectiva.estado_encuesta where esen_usuario like '"+req.body.codigo+"' and esen_prospectiva='"+req.body.prospectiva+"';");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
}

//Listar resultados de acciones
module.exports.ListarResultados=async function(req, callback){
  try {
    var response;
    if(req.body.tipo==1){
      response= await pool.pool.query("select * from prospectiva.f_accionesresultados('"+req.body.codigo+"') left join prospectiva.tabulacion on accid=tab_acc where tab_acc is null;");
    }else if(req.body.tipo==2){
      response= await pool.pool.query("select * from prospectiva.f_accionesresultados('"+req.body.codigo+"') inner join prospectiva.accion on accid=acc_id left join prospectiva.tabulacion on accid=tab_acc where tab_acc is null and total>='"+req.body.umbral+"' order by total desc;");
    }else if(req.body.tipo==3){
      response= await pool.pool.query("select tab_acc, tab_valor_total, tab_estado, acc_id, acc_cdes, acc_descripcion, acc_clon, acc_cambio, acc_estado, acc_accionid, cdes_id, cdes_criterio, cdes_cdesid, cdes_descripcion, cdes_clon, cdes_cambio, cdes_estado, cri_id, cri_prospectiva,cri_nombre, cri_clon, cri_estado, cri_fase, estr_id, estr_descripcion, estr_clon, estr_cambio, estr_accion, estr_prospectiva, (case when estr_tipo is null then 0 else estr_tipo end) estr_tipo from prospectiva.tabulacion inner join prospectiva.accion on tab_acc=acc_id join prospectiva.criterio_descripcion on acc_cdes=cdes_id join prospectiva.criterio on cdes_criterio=cri_id left join prospectiva.estructura_arbol on acc_id=estr_accion where cri_prospectiva='"+req.body.codigo+"' order by tab_valor_total desc;");
    }else if(req.body.tipo==4){
      response= await pool.pool.query("select * from prospectiva.tabulacion inner join prospectiva.accion on tab_acc=acc_id join prospectiva.criterio_descripcion on acc_cdes=cdes_id join prospectiva.criterio on cdes_criterio=cri_id left join prospectiva.accion_ejes on acc_id=aeje_accion where cri_prospectiva='"+req.body.codigo+"' and aeje_accion is null order by acc_id desc;");
    }
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
    callback(false);
  }
}

//Listado de acciones para modificar en ejes estratégicos
module.exports.ListarAccionesEjes=async function(req, callback){
  try {
    const response= await pool.pool.query("select * from prospectiva.tabulacion inner join prospectiva.accion on tab_acc=acc_id join prospectiva.criterio_descripcion on acc_cdes=cdes_id join prospectiva.criterio on cdes_criterio=cri_id left join prospectiva.accion_ejes on acc_id=aeje_accion where cri_prospectiva='"+req.body.codigo+"' and (aeje_eje='"+req.body.eje+"' or aeje_eje is null) order by acc_id desc;");
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
}

//Ingresar tiempos para la evaluación
module.exports.IngresarTiempo = async function (req, callback) {
  try {
    const response = await pool.pool.query("INSERT INTO prospectiva.tiempo(tiem_id, tiem_nombre, tiem_fecha_inicio, tiem_fecha_fin, tiem_tipo, tiem_prospectiva) VALUES ((select * from prospectiva.f_codigo_prospectiva(8)), '"+req.body.tiem_nombre+"', '"+req.body.tiem_fecha_inicio+"', '"+req.body.tiem_fecha_fin+"', '"+req.body.tiem_tipo+"', '"+req.body.tiem_prospectiva+"');");
    
    if (response.rowCount > 0) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Ingresar tabulacion
module.exports.IngresarTabulacion = async function (req, callback) {
  try {
    const response = await pool.pool.query("INSERT INTO prospectiva.tabulacion(tab_acc, tab_valor_total, tab_fecha) VALUES ('"+req.body.tab_acc+"', '"+req.body.tab_valor_total+"', now());");
    
    if (response.rowCount > 0) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Ingresar encuesta estado
module.exports.IngresarEncuestaEstado = async function (req, callback) {
  try {
    const response = await pool.pool.query("INSERT INTO prospectiva.estado_encuesta(esen_usuario, esen_estado, esen_rol, esen_prospectiva) VALUES ('"+req.body.esen_usuario+"', '"+req.body.esen_estado+"', '"+req.body.esen_rol+"', '"+req.body.esen_prospectiva+"');");
    if (response.rowCount > 0) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Modificar para la evaluación
module.exports.ModificarTiempo = async function (req, callback) {
  try {
    const response = await pool.pool.query("UPDATE prospectiva.tiempo set tiem_nombre='"+req.body.tiem_nombre+"', tiem_fecha_inicio='"+req.body.tiem_fecha_inicio+"', tiem_fecha_fin='"+req.body.tiem_fecha_fin+"', tiem_tipo='"+req.body.tiem_tipo+"' where tiem_id='"+req.body.tiem_id+"';");
    
    if (response.rowCount > 0) {
      callback(true, response.rows);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
};

//Lista criterios que se encuentren registrados en el sistema
module.exports.IngresarRespuesta = async function (req, callback) {
  try {
    var sum=0;
    for(let accion of req.body.respuesta){
      const response = await pool.pool.query("INSERT INTO prospectiva.encuesta_valores(enc_cri, enc_acc, enc_usuario, enc_rol, enc_respuesta) VALUES ('"+accion.cri_des+"','"+accion.accion+"', '"+req.body.usuario+"', '"+req.body.rol+"', '"+accion.respuesta+"');");
      if(response.rowCount>0){
        sum++;
      }
    }
    if (sum==req.body.respuesta.length) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.log("Error: " + error.stack);
  }
}

  module.exports.EliminarAccionesTab= async function (req, callback) {
    try {
      var sum=0;
      for(let accion of req.body.acciones){
        const response = await pool.pool.query("DELETE FROM prospectiva.tabulacion WHERE tab_acc='"+accion+"';");
        if(response.rowCount>0){
          sum++;
        }
      }
      if (sum==req.body.acciones.length) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      console.log("Error: " + error.stack);
    }
  }