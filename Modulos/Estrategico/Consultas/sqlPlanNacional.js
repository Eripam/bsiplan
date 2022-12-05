const pool = require("../Config/conBaseDatos");

//Listar objetivos del plan nacional completo
module.exports.ListarObjetivosPlanN = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when objpn_estado=1 then 'Activo' when objpn_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.objetivo_pn order by objpn_id;");
        }else{
            response = await pool.pool.query("SELECT * FROM estrategico.objetivo_pn where objpn_estado=1 order by objpn_id;");
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

//Listar politicas del plan nacional completo
module.exports.ListarPoliticasPlanN = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when polpn_estado=1 then 'Activo' when polpn_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.politica_pn inner join estrategico.objetivo_pn on polpn_objetivo=objpn_id where objpn_estado=1 order by objpn_id, polpn_id;");
        }else{
            response = await pool.pool.query("SELECT * FROM estrategico.politica_pn inner join estrategico.objetivo_pn on polpn_objetivo=objpn_id where objpn_estado=1 and polpn_estado=1 order by objpn_id, polpn_id;");
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

//Listar metas del plan nacional completo
module.exports.ListarMetasPlanN = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when metapn_estado=1 then 'Activo' when metapn_estado=0 then 'Inactivo' end as estadonombre FROM estrategico.politica_pn inner join estrategico.meta_pn on polpn_id=metapn_politica where polpn_estado=1 order by polpn_id, metapn_id;");
        }else{
            response = await pool.pool.query("SELECT * FROM estrategico.meta_pn inner join estrategico.politica_pn on polpn_id=metapn_politica where polpn_estado=1 and metapn_estado=1 order by polpn_id, metapn_id;");
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

//Listar indicador del plan nacional completo
module.exports.ListarIndicadorPlanN = async function (req, callback){
    try {
        var response;
        if(req.body.tipo==1){
            response = await pool.pool.query("SELECT *, case when indp_estado=1 then 'Activo' when indp_estado=0 then 'Inactivo' end as estadonombre, case when indpn_expresion=1 then 'Numerico' when indpn_expresion=0 then 'Porcentaje' end as indpn_expresion_n FROM estrategico.meta_pn inner join estrategico.indicador_pn on metapn_id=indpn_meta where metapn_estado=1 order by metapn_id, indpn_id;");
        }else{
            response = await pool.pool.query("SELECT * FROM estrategico.meta_pn inner join estrategico.indicador_pn on metapn_id=indpn_meta where metapn_estado=1 and indp_estado=1 order by metapn_id, indpn_id;");
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

//Ingresar objetivos del plan nacional completo
module.exports.IngresarObjetivosPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.objetivo_pn(objpn_id, objpn_nombre) values((select * from estrategico.f_codigo_estrategico(6)), '"+req.body.objpn_nombre+"');");
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

//Modificar objetivos del plan nacional completo
module.exports.ModificarObjetivosPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.objetivo_pn SET objpn_nombre='"+req.body.objpn_nombre+"', objpn_estado='"+req.body.objpn_estado+"' where objpn_id='"+req.body.objpn_id+"';");
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

//Eliminar objetivos del plan nacional completo
module.exports.EliminarObjetivosPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.politica_pn where polpn_objetivo='"+req.body.objpn_id+"')");
        if(response.rowCount>0){
            if(response.rows[0].exists){
                const response2=await pool.pool.query("update estrategico.objetivo_pn set objpn_estado=0 where objpn_id='"+req.body.objpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }else{
                const response2=await pool.pool.query("delete from estrategico.objetivo_pn where objpn_id='"+req.body.objpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}

//Ingresar politicas del plan nacional completo
module.exports.IngresarPoliticasPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.politica_pn(polpn_id, polpn_nombre, polpn_objetivo) values((select * from estrategico.f_codigo_estrategico(7)), '"+req.body.polpn_nombre+"', '"+req.body.polpn_objetivo+"');");
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

//Modificar politicas del plan nacional completo
module.exports.ModificarPoliticasPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.politica_pn SET polpn_nombre='"+req.body.polpn_nombre+"', polpn_estado='"+req.body.polpn_estado+"', polpn_objetivo='"+req.body.polpn_objetivo+"' where polpn_id='"+req.body.polpn_id+"';");
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

//Eliminar politicas del plan nacional completo
module.exports.EliminarPoliticas = async function (req, callback){
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.meta_pn where metapn_politica='"+req.body.polpn_id+"')");
        if(response.rowCount>0){
            if(response.rows[0].exists){
                const response2=await pool.pool.query("update estrategico.politica_pn set polpn_estado=0 where polpn_id='"+req.body.polpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }else{
                const response2=await pool.pool.query("delete from estrategico.politica_pn where polpn_id='"+req.body.polpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}

//Ingresar meta del plan nacional completo
module.exports.IngresarMetasPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.meta_pn(metapn_id, metapn_nombre, metapn_politica) values((select * from estrategico.f_codigo_estrategico(8)), '"+req.body.metapn_nombre+"', '"+req.body.metapn_politica+"');");
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

//Modificar metas del plan nacional completo
module.exports.ModificarMetasPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.meta_pn SET metapn_nombre='"+req.body.metapn_nombre+"', metapn_estado='"+req.body.metapn_estado+"', metapn_politica='"+req.body.metapn_politica+"' where metapn_id='"+req.body.metapn_id+"';");
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

//Eliminar meta del plan nacional completo
module.exports.EliminarMetas = async function (req, callback){
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.indicador_pn where indpn_meta='"+req.body.metapn_id+"')");
        if(response.rowCount>0){
            if(response.rows[0].exists){
                const response2=await pool.pool.query("update estrategico.meta_pn set metapn_estado=0 where metapn_id='"+req.body.metapn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }else{
                const response2=await pool.pool.query("delete from estrategico.meta_pn where metapn_id='"+req.body.metapn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}

//Ingresar indicador del plan nacional completo
module.exports.IngresarIndicadorPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.indicador_pn(indpn_id, indpn_nombre, indpn_descripcion, indpn_expresion, indpn_meta, indpn_valor_inicial, indpn_valor_absoluto, indpn_valor_meta) values((select * from estrategico.f_codigo_estrategico(9)), '"+req.body.indpn_nombre+"', '"+req.body.indpn_descripcion+"', '"+req.body.indpn_expresion+"', '"+req.body.indpn_meta+"', '"+req.body.indpn_valor_inicial+"', '"+req.body.indpn_valor_absoluto+"', '"+req.body.indpn_valor_meta+"');");
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

//Modificar indicador del plan nacional completo
module.exports.ModificarIndicadorPlanN = async function (req, callback){
    try {
        const response = await pool.pool.query("UPDATE estrategico.indicador_pn SET indpn_nombre='"+req.body.indpn_nombre+"', indp_estado='"+req.body.indp_estado+"', indpn_meta='"+req.body.indpn_meta+"', indpn_expresion='"+req.body.indpn_expresion+"', indpn_valor_inicial='"+req.body.indpn_valor_inicial+"', indpn_valor_absoluto='"+req.body.indpn_valor_absoluto+"', indpn_valor_meta='"+req.body.indpn_valor_meta+"' where indpn_id='"+req.body.indpn_id+"';");
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

//Eliminar indicador del plan nacional completo
module.exports.EliminarIndicador = async function (req, callback){
    try {
        const response = await pool.pool.query("select exists(select * from estrategico.estructura_plan where eplan_indicador='"+req.body.indpn_id+"')");
        if(response.rowCount>0){
            if(response.rows[0].exists){
                const response2=await pool.pool.query("update estrategico.indicador_pn set indpn_estado=0 where indpn_id='"+req.body.indpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }else{
                const response2=await pool.pool.query("delete from estrategico.indicador_pn where indpn_id='"+req.body.indpn_id+"';");
                if(response2.rowCount>0){
                    callback(true);
                }else{
                    callback(false);
                }
            }
        }
    }  catch (error) {
        console.log("Error: " + error.stack);
        callback(false);
    }
}