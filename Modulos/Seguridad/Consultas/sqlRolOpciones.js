const pool = require("../Config/conBaseDatos");

//Lista de Rol-Opción que se encuentren registrados en el sistema
module.exports.RolOpcion = async function (callback) {
  try {
    const response = await pool.pool.query(
      "select *, CASE when rop_estado=1 then 'Activo' when rop_estado=0 then 'Inactivo' end rop_estado_nombre from seguridad.rol_opcion inner join seguridad.rol on rop_rol=rol_codigo join seguridad.padre_opcion on rop_padreop=pop_codigo join seguridad.opciones on rop_opcion=opc_codigo order by rop_rol;"
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

//Ingreso de Rol-Opción 
module.exports.IngresarRolOpcion = async function (req, callback) {
  try {
      const response = await pool.pool.query(
        "INSERT INTO seguridad.rol_opcion(rop_rol, rop_padreop, rop_opcion, rop_insertar, rop_modificar, rop_eliminar) VALUES ('"+req.body.rop_rol+"', '" +req.body.rop_padreop +"', '"+req.body.rop_opcion+"', '"+req.body.rop_insertar+"', '"+req.body.rop_modificar+"', '"+req.body.rop_eliminar+"');"
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

//Modificación de Rol-Opción 
module.exports.ModificarRolOpcion = async function (req, callback) {
    try {
      const response = await pool.pool.query(
        "UPDATE seguridad.rol_opcion SET rop_padreop='" +req.body.rop_padreop +"', rop_opcion='"+req.body.rop_opcion+"', rop_estado='"+req.body.rop_estado+"', rop_insertar='"+req.body.rop_insertar+"', rop_modificar='"+req.body.rop_modificar+"', rop_eliminar='"+req.body.rop_eliminar+"' where rop_rol='" +req.body.rop_rol +"' and rop_padreop='"+req.body.rop_padreop_a+"' and  rop_opcion='"+req.body.rop_opcion_a+"';");
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