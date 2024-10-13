const pool = require("../Config/conBaseDatos");

//Listar estrutura plan para hijos mapa
module.exports.ListarCronograma = async function(req, callback){
  try {
    const response = await pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+req.body.codigo+"' order by cro_anio;");
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}

//Listar estrutura cronograma
module.exports.ListarEstructuraCronograma = async function(req, callback){
  try {
    if(req.body.codigo!=="0"){
      var respuesta=[];
      const response= await pool.pool.query("select * from estrategico.eje_estrategico where eje_estado=1 order by eje_id;");
      if(response.rowCount>0){
        for(let dat of response.rows){
            var datos1=await listarHijosEje(dat.eje_id, req.body.codigo);
            var datos=[];
            var padre=req.body.eplan;
            if(datos1){
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
                            var datos8=[];
                            if(dat5.count>0){
                              var datos9=await listarHijos(dat5.eplan_id);
                              for(let dat6 of datos9){
                                if(dat6.eplan_id==padre){
                                  padre=dat6.eplan_eplan_id;
                                  var cron8=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+dat6.eplan_id+"') order by cro_anio, cro_periodo;");
                                  datos8.push({"data": {"tipo":dat6.est_nombre,"eplan_id": dat6.eplan_id, "eplan_nombre":dat6.eplan_nombre, "eplan_codigo":dat6.codigo, "orden":dat6.est_orden, "suma":dat6.sum, "sumah":dat6.count,"cronograma":(await cron8).rows}, expanded: true});
                                }else{
                                  var cron8=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+dat6.eplan_id+"') order by cro_anio, cro_periodo;");
                                  datos8.push({"data": {"tipo":dat6.est_nombre,"eplan_id": dat6.eplan_id, "eplan_nombre":dat6.eplan_nombre, "eplan_codigo":dat6.codigo, "orden":dat6.est_orden, "suma":dat6.sum, "sumah":dat6.count,"cronograma":(await cron8).rows}, expanded: false});
                                }
                              }
                            }
                            if(padre==dat5.eplan_id){
                              padre=dat5.eplan_eplan_id;
                              var cron7=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+dat5.eplan_id+"') order by cro_anio, cro_periodo;");
                              datos6.push({"data": {"tipo":dat5.est_nombre,"eplan_id": dat5.eplan_id, "eplan_nombre":dat5.eplan_nombre, "eplan_codigo":dat5.codigo, "orden":dat5.est_orden, "suma":dat5.sum, "sumah":dat5.count, "cronograma":(await cron7).rows}, expanded: true, "children":datos8});
                            }else{
                              var cron7=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+dat5.eplan_id+"') order by cro_anio, cro_periodo;");
                              datos6.push({"data": {"tipo":dat5.est_nombre,"eplan_id": dat5.eplan_id, "eplan_nombre":dat5.eplan_nombre, "eplan_codigo":dat5.codigo, "orden":dat5.est_orden, "suma":dat5.sum, "sumah":dat5.count, "cronograma":(await cron7).rows}, expanded: false, "children":datos8});
                            }
                          }
                        }
                        if(padre==datos4[i].eplan_id){
                          padre=datos4[i].eplan_eplan_id;
                          var cron6=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+datos4[i].eplan_id+"') order by cro_anio, cro_periodo;");
                          datos5.push({"data": {"tipo":datos4[i].est_nombre, "eplan_id": datos4[i].eplan_id, "eplan_nombre":datos4[i].eplan_nombre, "eplan_codigo":datos4[i].codigo, "orden":datos4[i].est_orden, "suma":datos4[i].sum, "sumah":datos4[i].count,"cronograma":(await cron6).rows},expanded: true,"children":datos6});
                        }else{
                          var cron6=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"', '"+datos4[i].eplan_id+"') order by cro_anio, cro_periodo;");
                          datos5.push({"data": {"tipo":datos4[i].est_nombre, "eplan_id": datos4[i].eplan_id, "eplan_nombre":datos4[i].eplan_nombre, "eplan_codigo":datos4[i].codigo, "orden":datos4[i].est_orden, "suma":datos4[i].sum, "sumah":datos4[i].count,"cronograma":(await cron6).rows},expanded: false,"children":datos6});
                        }
                      }
                    }
                    if(padre==dat3.eplan_id){
                      padre=dat3.eplan_eplan_id;
                      var cron5=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"','"+dat3.eplan_id+"') order by cro_anio, cro_periodo;");
                      datos2.push({"data": {"tipo":dat3.est_nombre, "eplan_id": dat3.eplan_id, "eplan_nombre":dat3.eplan_nombre, "eplan_codigo":dat3.codigo, "orden":dat3.est_orden, "suma":dat3.sum, "sumah":dat3.count,"cronograma":(await cron5).rows},expanded: true,"children":datos5});
                    }else{
                      var cron5=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"','"+dat3.eplan_id+"') order by cro_anio, cro_periodo;");
                      datos2.push({"data": {"tipo":dat3.est_nombre, "eplan_id": dat3.eplan_id, "eplan_nombre":dat3.eplan_nombre, "eplan_codigo":dat3.codigo, "orden":dat3.est_orden, "suma":dat3.sum, "sumah":dat3.count,"cronograma":(await cron5).rows},expanded: false,"children":datos5});
                    }
                  }
                }
                if(padre==dat2.eplan_id){
                  padre=dat2.eplan_eje;
                  var cron4=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"','"+dat2.eplan_id+"') order by cro_anio, cro_periodo;");
                  datos.push({"data": {"tipo":dat2.est_nombre, "eplan_id": dat2.eplan_id, "eplan_nombre":dat2.eplan_nombre, "eplan_codigo":dat2.codigo, "orden":dat2.est_orden, "suma":dat2.sum, "sumah":dat2.count,"cronograma":(await cron4).rows},expanded: true,"children":datos2});
                }else{
                  var cron4=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"','"+dat2.eplan_id+"') order by cro_anio, cro_periodo;");
                  datos.push({"data": {"tipo":dat2.est_nombre, "eplan_id": dat2.eplan_id, "eplan_nombre":dat2.eplan_nombre, "eplan_codigo":dat2.codigo, "orden":dat2.est_orden, "suma":dat2.sum, "sumah":dat2.count,"cronograma":(await cron4).rows},expanded: false,"children":datos2});
                }
              }
            }
          if(padre==dat.eje_id){
            var cron3=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"',0) order by cro_anio, cro_periodo;");
            respuesta.push({"data": {"tipo":dat.eje_nombre, "eplan_id": dat.eje_id, "eplan_nombre":dat.eje_nombre, "eplan_codigo":dat.codigo, "orden":0, "suma":dat.sum, "sumah":dat.count,"cronograma":(await cron3).rows}, expanded: true,"children": datos});
          }else{
            var cron3=pool.pool.query("select * from estrategico.f_listadocronograma('"+req.body.codigo+"',0) order by cro_anio, cro_periodo;");
            respuesta.push({"data": {"tipo":dat.eje_nombre, "eplan_id": dat.eje_id, "eplan_nombre":dat.eje_nombre, "eplan_codigo":dat.codigo, "orden":0, "suma":dat.sum, "sumah":dat.count,"cronograma":(await cron3).rows}, expanded: false,"children": datos});
          }
        }
        callback(true, respuesta);
      }else{
        callback(false);
      }
    }
    
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}

async function listarHijosEje(dato, codigo){
  try {
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1), (est_codigo || '-'|| eplan.eplan_codigo) as codigo, (select sum(cro_valor) from estrategico.cronograma where cro_eplan=eplan.eplan_id) from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eje='"+dato+"' and eplan_estado=1 and eplan_plan='"+codigo+"' order by eplan_codigo;");
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

async function listarHijos(dato){
  try {
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1), (est_codigo || '-'|| eplan.eplan_codigo) as codigo, (select sum(cro_valor) from estrategico.cronograma where cro_eplan=eplan.eplan_id) from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eplan_id='"+dato+"' and eplan_estado=1 order by eplan_codigo;");
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

//Listar estructura cronograma pdf
module.exports.ListarCronogramaPdf=async function(codigo){
  try {
    const response=await pool.pool.query("select * from estrategico.f_listaestructuracronograma('"+codigo+"')");
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

//Listar estructua cronograma por años
module.exports.ListarCronogramaAnio=async function(codigo, plan){
  try {
    const response=await pool.pool.query("select * from estrategico.f_listadocronograma('"+plan+"', '"+codigo+"') order by cro_periodo");
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

//Listar estructua cronograma por años
module.exports.ListarPeriodo=async function(req, callback){
  try {
    var response;
    if(req.body.tipo==1){
      response=await pool.pool.query("select * from estrategico.periodo where per_estado=1 order by per_id;");
    }else{
      response=await pool.pool.query("select *, case when per_estado=1 then 'Activo' when per_estado=0 then 'Inactivo' end as estadonombre from estrategico.periodo order by per_id;");
    }
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}

//Listar estructua periodo plan
module.exports.ListarPeriodoPlan=async function(req, callback){
  try {
    const response=await pool.pool.query("select *, case when perp_estado=1 then 'Activo' when perp_estado=0 then 'Inactivo' end as estadonombre from estrategico.periodo_plan inner join estrategico.periodo on perp_periodo=per_id where perp_plan='"+req.body.perp_plan+"' order by perp_periodo;");
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}

//Listar estructua periodo plan
module.exports.ListarPeriodoPlanPeri=async function(req, callback){
  try {
    const response=await pool.pool.query("select * from estrategico.periodo_plan inner join estrategico.periodo on perp_periodo=per_id where perp_plan='"+req+"' and perp_estado=1 order by perp_periodo;");
    if(response.rowCount>0){
      callback(true, response.rows);
    }else{
      callback(false);
    }
  } catch (error) {
    console.log("Error: "+error.stack);
    callback(false);
  }
}


//Ingresar periodo
module.exports.IngresarPeriodo = async function (req, callback){
  try {      
      const response=await pool.pool.query("INSERT INTO estrategico.periodo(per_nombre, per_maximo) VALUES('"+req.body.per_nombre+"', '"+req.body.per_maximo+"');");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}

//Modificar periodo
module.exports.ModificarPeriodo = async function (req, callback){
  try {      
      const response=await pool.pool.query("UPDATE estrategico.periodo SET per_nombre='"+req.body.per_nombre+"', per_maximo='"+req.body.per_maximo+"', per_estado='"+req.body.per_estado+"' where per_id='"+req.body.per_id+"';");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}

//Eliminar periodo
module.exports.EliminarPeriodo = async function (req, callback){
  try {      
      const response=await pool.pool.query("DELETE from estrategico.periodo where per_id='"+req.body.per_id+"';");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}

//Ingresar periodo plan
module.exports.IngresarPeriodoPlan = async function (req, callback){
  try {      
      const response=await pool.pool.query("INSERT INTO estrategico.periodo_plan(perp_plan, perp_periodo) VALUES('"+req.body.perp_plan+"', '"+req.body.perp_periodo+"');");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}

//Modificar periodo plan
module.exports.ModificarPeriodoPlan = async function (req, callback){
  try {      
      const response=await pool.pool.query("UPDATE estrategico.periodo_plan set perp_estado='"+req.body.perp_estado+"' where perp_plan='"+req.body.perp_plan+"' and perp_periodo='"+req.body.perp_periodo+"';");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}

//Eliminar periodo plan
module.exports.EliminarPeriodoPlan = async function (req, callback){
  try {      
      const response=await pool.pool.query("DELETE FROM  estrategico.periodo_plan where perp_plan='"+req.body.perp_plan+"' and perp_periodo='"+req.body.perp_periodo+"' and perp_estado='"+req.body.perp_estado+"';");
      if(response.rowCount>0){
         callback(true);
      } else {
         callback(false);
      }
  }  catch (error) {
      console.log("Error: " + error.stack);
      callback(false);
    }
}
//Ingresar cronograma
module.exports.IngresarCronograma = async function (req, callback){
    try {
        const response=await pool.pool.query("INSERT INTO estrategico.cronograma(cro_id, cro_valor, cro_anio, cro_eplan, cro_periodo) VALUES((select * from estrategico.f_codigo_estrategico(5)), '"+req.body.cro_valor+"', '"+req.body.cro_anio+"', '"+req.body.cro_eplan+"', '"+req.body.cro_periodo+"');");
        if(response.rowCount>0){
            callback(true);
        }else{
          callback(false);
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}

//Modificar cronograma
module.exports.ModificarCronograma = async function (req, callback){
    try {
      const response=await pool.pool.query("UPDATE estrategico.cronograma set cro_valor='"+req.body.cro_valor+"' where cro_id='"+req.body.cro_id+"';");
      if(response.rowCount>0){
          callback(true);
      }else{
        callback(false);
      }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}