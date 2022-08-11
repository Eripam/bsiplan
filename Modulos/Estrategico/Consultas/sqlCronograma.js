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
    var respuesta=[];
    const response= await pool.pool.query("select * from estrategico.eje_estrategico where eje_estado=1 and eje_plan='"+req.body.codigo+"' order by eje_id;");
    if(response.rowCount>0){
      for(let dat of response.rows){
          var datos1=await listarHijosEje(dat.eje_id);
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
                        var datos8=[];
                        if(dat5.count>0){
                          var datos9=await listarHijos(dat5.eplan_id);
                          for(let dat6 of datos9){
                            var cron8=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+dat6.eplan_id+"' order by cro_anio;");
                            datos8.push({"data": {"tipo":dat6.est_nombre,"eplan_id": dat6.eplan_id, "eplan_nombre":dat6.eplan_nombre, "eplan_codigo":dat6.codigo, "orden":dat6.est_orden, "suma":dat6.sum, "cronograma":(await cron8).rows}});
                          }
                        }
                        var cron7=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+dat5.eplan_id+"' order by cro_anio;");
                        datos6.push({"data": {"tipo":dat5.est_nombre,"eplan_id": dat5.eplan_id, "eplan_nombre":dat5.eplan_nombre, "eplan_codigo":dat5.codigo, "orden":dat5.est_orden, "suma":dat5.sum, "cronograma":(await cron7).rows}, "children":datos8});
                      }
                    }
                    var cron6=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+datos4[i].eplan_id+"' order by cro_anio;");
                    datos5.push({"data": {"tipo":datos4[i].est_nombre, "eplan_id": datos4[i].eplan_id, "eplan_nombre":datos4[i].eplan_nombre, "eplan_codigo":datos4[i].codigo, "orden":datos4[i].est_orden, "suma":datos4[i].sum, "cronograma":(await cron6).rows},"children":datos6});
                  }
                }
                var cron5=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+dat3.eplan_id+"' order by cro_anio;");
                datos2.push({"data": {"tipo":dat3.est_nombre, "eplan_id": dat3.eplan_id, "eplan_nombre":dat3.eplan_nombre, "eplan_codigo":dat3.codigo, "orden":dat3.est_orden, "suma":dat3.sum, "cronograma":(await cron5).rows},"children":datos5});
              }
            }
            var cron4=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='"+dat2.eplan_id+"' order by cro_anio;");
            datos.push({"data": {"tipo":dat2.est_nombre, "eplan_id": dat2.eplan_id, "eplan_nombre":dat2.eplan_nombre, "eplan_codigo":dat2.codigo, "orden":dat2.est_orden, "suma":dat2.sum, "cronograma":(await cron4).rows},"children":datos2});
          }
        var cron3=pool.pool.query("Select * from estrategico.cronograma where cro_eplan='0' order by cro_anio;");
        respuesta.push({"data": {"tipo":dat.eje_nombre, "eplan_id": dat.eje_id, "eplan_nombre":dat.eje_nombre, "eplan_codigo":dat.codigo, "orden":0, "suma":dat.sum, "cronograma":(await cron3).rows},"children": datos});
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

async function listarHijosEje(dato){
  try {
    const response = await pool.pool.query("select *, (select count(eplan_id) from estrategico.estructura_plan where eplan_eplan_id=eplan.eplan_id and eplan_estado=1), (est_codigo || '-'|| eplan.eplan_codigo) as codigo, (select sum(cro_valor) from estrategico.cronograma where cro_eplan=eplan.eplan_id) from estrategico.estructura_plan as eplan inner join estrategico.estructura on eplan.eplan_estructura=est_id where eplan.eplan_eje='"+dato+"' and eplan_estado=1 order by eplan_codigo;");
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
module.exports.ListarCronogramaAnio=async function(codigo, anio){
  try {
    const response=await pool.pool.query("select * from estrategico.cronograma where cro_eplan='"+codigo+"' and cro_anio='"+anio+"';");
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

//Ingresar cronograma
module.exports.IngresarCronograma = async function (req, callback){
    try {
        var anio=req.body.fechainicio;
        var suma=0;
        for(let cro of req.body.valores){
            const response=await pool.pool.query("INSERT INTO estrategico.cronograma(cro_id, cro_valor, cro_anio, cro_eplan) VALUES((select * from estrategico.f_codigo_estrategico(5)), '"+cro+"', '"+anio+"', '"+req.body.codigo+"');");
            anio++;
            if(response.rowCount>0){
                suma++;
            }
        }
        if (suma==req.body.valores.length) {
           callback(true);
        } else {
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
        var anio=req.body.fechainicio;
        var suma=0;
        for(let cro of req.body.valores){
            const response=await pool.pool.query("UPDATE estrategico.cronograma SET cro_valor='"+cro+"' where cro_anio='"+anio+"' and  cro_eplan='"+req.body.codigo+"';");
            anio++;
            if(response.rowCount>0){
                suma++;
            }
        }
        if (suma==req.body.valores.length) {
           callback(true);
        } else {
           callback(false);
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
      }
}