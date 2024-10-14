const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "172.17.102.25",
  database: "siplan-planes",
  password: "@@pruebasdb2024",
  port: 3311,
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
