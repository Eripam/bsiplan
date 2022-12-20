const pool = require("../Config/conBaseDatos");

//Ingresar responsables y coresponsables
module.exports.IngresarResponsable = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.responsables_eplan (replan_eplan, replan_dependencia, replan_tipo) values('"+req.replan_plan+"', '"+req.replan_dependencia+"', '"+req.replan_tipo+"');");
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

//Listar responsables y corresponsables
module.exports.ListarResponsables = async function (req, callback){
    try {
        const response = await pool.pool.query("select * from estrategico.responsables_eplan where replan_eplan='"+req.body.replan_eplan+"' and replan_tipo='"+req.body.replan_tipo+"';");
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

//Delente responsables y coresponsables
module.exports.EliminarResponsable = async function (req, callback){
    try {
        const response = await pool.pool.query("delete from estrategico.responsables_eplan where replan_eplan='"+req.body.replan_eplan+"' and replan_dependencia='"+req.body.replan_dependencia+"' and replan_tipo='"+req.body.replan_tipo+"';");
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