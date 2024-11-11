const { response } = require("express");
const pool = require("../Config/conBaseDatos");

//Listar estructura del plan
module.exports.ListarEstructuraPlan = async function (req, callback){
    try {
      var response;
        if(req.body.tipo==1){
          response = await pool.pool.query(`SELECT ep.eplan_id, ep.eplan_nombre, ep.eplan_plan, ep.eplan_estructura, ep.eplan_eplan_id, 
            ep.eplan_estado, ep.eplan_depende, est.est_id, est.est_nombre, (est.est_codigo || '-'|| ep.eplan_codigo) as codigo, 
            (est2.est_codigo || '-'||ep2.eplan_codigo) as codigopadre, eje_nombre, eje_id, est.est_orden, 
            case when ep.eplan_estado=1 then 'Activo' when ep.eplan_estado=0 then 'Inactivo' end as estadonombre, 
            (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=ep.eplan_id), 
            ep.eplan_indicador,
            (select (est_codigo||'-'||eplan_codigo||':'||eplan_nombre) from estrategico.estructura inner join estrategico.estructura_plan on est_id=eplan_estructura where eplan_id=ep.eplan_depende) as depende FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on 
            ep.eplan_estructura=est_id left join 
            estrategico.estructura_plan as ep2 on ep.eplan_eplan_id=ep2.eplan_id left join 
            estrategico.estructura as est2 on ep2.eplan_estructura=est2.est_id left join 
            estrategico.eje_estrategico on ep.eplan_eje=eje_id 
            where ep.eplan_plan=${req.body.codigo} and ep.eplan_estructura=${req.body.estructura} order by ep.eplan_estructura, ep.eplan_codigo;`);
  
        }else if(req.body.tipo==2){
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_codigo, ep.eplan_nombre, est.est_codigo, ep.eplan_indicador FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id where ep.eplan_plan='"+req.body.codigo+"'  and ep.eplan_estado=1 order by ep.eplan_estructura, ep.eplan_codigo;");
        }else if(req.body.tipo==3){
          var orden=req.body.orden-1;
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_codigo, ep.eplan_nombre, est.est_codigo, ep.eplan_indicador, LEFT(ep.eplan_nombre, 60) AS nombre_corto FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id where ep.eplan_plan='"+req.body.codigo+"'  and ep.eplan_estado=1 and est.est_orden='"+orden+"' order by ep.eplan_estructura, ep.eplan_codigo;");
        }else{
          response = await pool.pool.query("SELECT ep.eplan_id, ep.eplan_codigo, ep.eplan_nombre, est.est_codigo, ep.eplan_indicador, LEFT(ep.eplan_nombre, 60) AS nombre_corto FROM estrategico.estructura_plan as ep inner join estrategico.estructura as est on ep.eplan_estructura=est_id where ep.eplan_plan='"+req.body.codigo+"'  and ep.eplan_estado=1 and est.est_orden=(select max(est_orden) from estrategico.estructura where est_plan='"+req.body.codigo+"' and est_estado=1 and est_planes=true) order by ep.eplan_estructura, ep.eplan_codigo;");
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
    var respuesta=[];
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1), (est_codigo || '-'|| eplan.eplan_codigo) as codigo from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eplan_id='"+req.body.codigo+"' and eplan_estado=1;");
    if(response.rowCount>0){
      for(let dat of response.rows){
        if(dat.count>0){
          var datos1=await listarHijos(dat.eplan_id);
          var datos=[];
          for(let dat2 of datos1){
            if(dat2.count>0){
              var datos3=await listarHijos(dat2.eplan_id);
              var datos2=[];
              for(let dat3 of datos3){
                var datos5=[];
                if(dat3.count>0){
                  var datos4=await listarHijos(dat3.eplan_id);
                  for(var i=0; i<datos4.length; i++){
                    var datos6=[]
                    if(datos4[i].count>0){
                      var datos7=await listarHijos(datos4[i].eplan_id);
                      for(let dat5 of datos7){
                        datos6.push({"label":dat5.est_nombre, "type": 'person', "styleClass": 'p-person', "expanded": false, "data": {"eplan_id": dat5.eplan_id, "eplan_nombre":dat5.eplan_nombre, "eplan_codigo":dat5.codigo}});
                      }
                    }
                    datos5.push({"label":datos4[i].est_nombre, "type": 'person', "styleClass": 'p-person', "expanded": false, "data": {"eplan_id": datos4[i].eplan_id, "eplan_nombre":datos4[i].eplan_nombre, "eplan_codigo":datos4[i].codigo}, "children":datos6});
                  }
                }
                datos2.push({"label":dat3.est_nombre, "type": 'person', "styleClass": 'p-person', "expanded": false, "data": {"eplan_id": dat3.eplan_id, "eplan_nombre":dat3.eplan_nombre, "eplan_codigo":dat3.codigo}, "children":datos5});
              }
            }
            datos.push({"label":dat2.est_nombre, "type": 'person', "styleClass": 'p-person', "expanded": false, "data": {"eplan_id": dat2.eplan_id, "eplan_nombre":dat2.eplan_nombre, "eplan_codigo":dat2.codigo}, "children":datos2});
          }
        }
        respuesta.push({"label":dat.est_nombre, "type": 'person', "styleClass": 'p-person', "expanded": false, "data": {"eplan_id": dat.eplan_id, "eplan_nombre":dat.eplan_nombre, "eplan_codigo":dat.codigo}, "children": datos});
      }
      callback(true, respuesta);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}

async function listarHijos(dato){
  try {
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1), (est_codigo || '-'|| eplan.eplan_codigo) as codigo from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eplan_id='"+dato+"' and eplan_estado=1 order by eplan_codigo;");
    if(response.rowCount>0){
      return(response.rows);
    }else{
      return(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    return(false);
  }
}

async function listarEplanCodigo(codigo){
  try {
    const response = await pool.pool.query(`select * from (WITH RECURSIVE estructura_recursiva AS (
    SELECT 
        ep.eplan_id,
        ep.eplan_eplan_id,
        ep.eplan_estructura,
        e.est_orden,
        e.est_orden AS nivel,
        ep.eplan_nombre,
		e.est_nombre,
		ep.eplan_eje
    FROM 
        estrategico.estructura_plan ep
    INNER JOIN 
        estrategico.estructura e ON ep.eplan_estructura = e.est_id
    WHERE 
        ep.eplan_id = ${codigo} and
		ep.eplan_estado=1 and
		e.est_estado=1
    UNION ALL
    SELECT 
        parent.eplan_id,
        parent.eplan_eplan_id,
        parent.eplan_estructura,
        e_parent.est_orden,
        e_parent.est_orden AS nivel, 
        parent.eplan_nombre,
		e_parent.est_nombre,	
		parent.eplan_eje
    FROM 
        estrategico.estructura_plan parent
    INNER JOIN 
        estructura_recursiva cr ON parent.eplan_id = cr.eplan_eplan_id
    INNER JOIN 
        estrategico.estructura e_parent ON parent.eplan_estructura = e_parent.est_id
	WHERE
		parent.eplan_estado=1 and
		e_parent.est_estado=1
)
SELECT 
    eplan_id,
    eplan_eplan_id,
    eplan_estructura,
    est_orden,
    nivel,
    eplan_nombre,
	est_nombre,
	eplan_eje
FROM 
    estructura_recursiva
ORDER BY 
    est_orden DESC) as con where est_orden=1;`);
    if(response.rowCount>0){
      return(response.rows);
    }else{
      return(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    return(false);
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
              const listado=await listarEplanCodigo(req.body.eplan_depende);
              response = await pool.pool.query("INSERT INTO estrategico.estructura_plan(eplan_id, eplan_codigo, eplan_nombre, eplan_plan, eplan_estructura, eplan_depende, eplan_eje) VALUES ((select * from estrategico.f_codigo_estrategico(3)), (select * from estrategico.f_codigo_estructuraplan('"+req.body.eplan_estructura+"')), '"+req.body.eplan_nombre+"', '"+req.body.eplan_plan+"', '"+req.body.eplan_estructura+"', '"+req.body.eplan_depende+"', '"+listado[0].eplan_eje+"');");
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

//Modificar estructura plan indicador
module.exports.ModificarEstructuraPlanIndicador = async function (req, callback){
  try {
      const response=await pool.pool.query("UPDATE estrategico.estructura_plan SET eplan_indicador='"+req.body.eplan_indicador+"' WHERE eplan_id='"+req.body.eplan_id+"';");
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