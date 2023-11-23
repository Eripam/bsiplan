const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "siplan-planes",
  password: "123",
  port: 5432,
});

pool
  .connect()
  .then(
    (console.log("*****************************"),
    console.log("Conexión exitosa a Base de Datos Planes PostgreSQL"),
    console.log("*****************************"))
  )
  .catch((err) =>
    console.error("Error en la Conexion de la Base de Datos", err.stack)
  );

module.exports = {
  pool,
};
