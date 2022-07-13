const pool = require("../Config/conBaseDatos");

//Listar estructura del plan
module.exports.ListarEstructuraPlan = async function (req, callback){
    try {
      var response;
        if(req.body.tipo==1){
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_nombre, ep.eplan_plan, ep.eplan_estructura, ep.eplan_eplan_id, ep.eplan_estado, ep.eplan_depende, est.est_id, est.est_nombre, (est.est_codigo || '-'|| ep.eplan_codigo) as codigo, (est2.est_codigo || '-'||ep2.eplan_codigo) as codigopadre, eje_nombre, eje_id, est.est_orden, case when ep.eplan_estado=1 then 'Activo' when ep.eplan_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id left join estrategico.estructura_plan as ep2 on ep.eplan_eplan_id=ep2.eplan_id left join estrategico.estructura as est2 on ep2.eplan_estructura=est2.est_id left join estrategico.eje_estrategico on ep.eplan_eje=eje_id where ep.eplan_plan='"+req.body.codigo+"' and ep.eplan_estructura='"+req.body.estructura+"' order by ep.eplan_estructura, ep.eplan_codigo;");
        }else if(req.body.tipo==2){
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_codigo, ep.eplan_nombre, est.est_codigo FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id where ep.eplan_plan='"+req.body.codigo+"'  and ep.eplan_estado=1 order by ep.eplan_estructura, ep.eplan_codigo;");
        }else{
          var orden=req.body.orden-1;
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_codigo, ep.eplan_nombre, est.est_codigo FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id where ep.eplan_plan='"+req.body.codigo+"'  and ep.eplan_estado=1 and (est.est_orden='"+orden+"' or est.est_orden='"+req.body.orden+"') order by ep.eplan_estructura, ep.eplan_codigo;");
        }
        if(response.rowCount>0){
            callback(true, response.rows);
        }else{
            callback(false);
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}

//Listar estructura del plan
module.exports.ListarEstructuraPlanSelect = async function (req, callback){
  try {
      const response = await pool.pool.query("select * from estrategico.f_listaestructura('"+req.body.codigo+"') order by orden;");
      if(response.rowCount>0){
          callback(true, response.rows);
      }else{
          callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
  }
}

//Listar estructura del plan
module.exports.ListarEstructuraPlanMapa = async function (req, callback){
  try {
      var lista=[];
      const estructura=await pool.pool.query("select * from estrategico.estructura where est_plan='"+req.body.codigo+"' and est_estado=1 order by est_orden, est_id limit 1;");
      if(estructura.rowCount>0){
        for(let est of estructura.rows){
          const response = await pool.pool.query("select * from estrategico.estructura_plan where eplan_plan='"+req.body.codigo+"' and eplan_estructura='"+est.est_id+"' and eplan_estado=1 order by eplan_codigo;");
          for(let eplan of response.rows){            
              const estructurplan=await pool.pool.query("select * from estrategico.estructura_plan inner join estrategico.estructura on eplan_estructura=est_id where eplan_eplan_id='"+eplan.eplan_id+"' and eplan_estado=1 order by eplan_codigo;");
              lista.push({"est_id":est.est_id, "est_nombre":est.est_nombre, "est_codigo":est.est_codigo, "eplan_id":eplan.eplan_id, "eplan_nombre":eplan.eplan_nombre, "eplan_codigo":eplan.eplan_codigo, "eplan_eplan_id":eplan.eplan_eplan_id, "pertenece":estructurplan.rows})
          }
        }
        callback(true, lista);
      }
      else{
          callback(false);
      }   
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
  }
}

//Listar estrutura plan para hijos mapa
module.exports.ListarEstructuraHijosMapa = async function(req, callback){
  try {
    var hijos=[];
    var codigo=-1;
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1) from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eplan_id='"+req.body.codigo+"' and eplan_estado=1;");
    if(response.rowCount>0){
      while(codigo=-1 || codigo>0){
        for(let resp of response.rows){
          if(resp.count>0){
            hijos.push({"eplan":eplan, "eplan_nombre":eplan_nombre, "eplan_codigo":eplan_codigo,"est_id":est_id, "est_nombre":est_nombre, "est_codigo":est_codigo})
          }
        }
      }
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}
//Ingresar estructura plan
module.exports.IngresarEstructuraPlan = async function (req, callback){
    try {
        var response;
        if(req.body.eplan_eje==0){
          if(req.body.eplan_eplan_id==0){
              if(req.body.eplan_depende==0){
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"');");
              }else{
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_depende) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_depende+"');");
              }
          }else{
              if(req.body.eplan_depende==0){
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_eplan_id) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_eplan_id+"');");
              }else{
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_eplan_id, eplan_depende) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_eplan_id+"', '"+req.body.eplan_depende+"');");
              }
          }
        }else{
          if(req.body.eplan_eplan_id==0){
            if(req.body.eplan_depende==0){
                response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_eje) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_eje+"');");
            }else{
                response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_depende, eplan_eje) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_depende+"', '"+req.body.eplan_eje+"');");
            }
          }else{
              if(req.body.eplan_depende==0){
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_eplan_id, eplan_eje) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_eplan_id+"', '"+req.body.eplan_eje+"');");
              }else{
                  response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_eplan_id, eplan_depende, eplan_eje) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_eplan_id+"', '"+req.body.eplan_depende+"', '"+req.body.eplan_eje+"');");
              }
          }
        }
        if (response.rowCount > 0) {
            callback(true);
          } else {
            callback(false);
          }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

//Modificar estructura plan
module.exports.ModificarEstructuraPlan = async function (req, callback){
    try {
        var response;
        if(req.body.eplan_eje == null || req.body.eplan_eje==0){
          if(req.body.eplan_eplan_id==0){
            if(req.body.eplan_depende==0){
                response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }else{
                response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_depende='"+req.body.eplan_depende+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }
          }else{
            if(req.body.eplan_depende==0){
              response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_eplan_id='"+req.body.eplan_eplan_id+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }else{
                response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_depende='"+req.body.eplan_depende+"', eplan_eplan_id='"+req.body.eplan_eplan_id+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }
          }
        }else{
          if(req.body.eplan_eplan_id==0){
            if(req.body.eplan_depende==0){
                response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_eje='"+req.body.eplan_eje+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }else{
                response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_depende='"+req.body.eplan_depende+"', eplan_eje='"+req.body.eplan_eje+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }
          }else{
            if(req.body.eplan_depende==0){
              response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_eplan_id='"+req.body.eplan_eplan_id+"', eplan_eje='"+req.body.eplan_eje+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }else{
              response = await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_nombre='"+req.body.eplan_nombre+"', eplan_estructura='"+req.body.eplan_estructura+"', eplan_estado='"+req.body.eplan_estado+"', eplan_depende='"+req.body.eplan_depende+"', eplan_eplan_id='"+req.body.eplan_eplan_id+"', eplan_eje='"+req.body.eplan_eje+"' WHERE eplan_id='"+req.body.eplan_id+"';");
            }
          }
        }
        if (response.rowCount > 0) {
            callback(true);
          } else {
            callback(false);
          }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

 //Validacion de eliminación de estructura planes
 module.exports.ValidacionEliminacionEstructura = async function (req, callback) {
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.estructura_plan where eplan_eplan_id='"+req.body.codigo+"');");
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

  //Eliminar estructura plan
module.exports.EliminarEstructuraPlan = async function (req, callback){
    try {
        const response = await pool.pool.query("DELETE FROM estrategico.estructura_plan WHERE eplan_id='"+req.body.eplan_id+"';");
        if (response.rowCount > 0) {
            callback(true);
          } else {
            callback(false);
          }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}