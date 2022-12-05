const pool = require("../Config/conBaseDatos");

//Ingresar responsables y coresponsables
module.exports.IngresarResponsable = async function (req, callback){
    try {
        const response = await pool.pool.query("INSERT INTO estrategico.responsables_eplan (replan_plan, replan_dependencia, replan_tipo) values('"+req.body.replan_plan+"', '"+req.body.replan_dependencia+"', '"+req.body.replan_tipo+"');");
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
        const response = await pool.pool.query("select * from estrategico.responsables_eplan where replan_eplan='"+req.body.replan_eplan+"'");
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
module.exports.DeleteResponsable = async function (req, callback){
    try {
        const response = await pool.pool.query("delete from estrategico.responsables_eplan where replan_plan='"+req.body.replan_plan+"' and replan_dependencia='"+req.body.replan_dependencia+"' and replan_tipo='"+req.body.replan_tipo+"';");
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