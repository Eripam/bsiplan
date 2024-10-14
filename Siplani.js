//imports
const express=require('express');
const EventEmitter = require("events");
const fs = require("fs");
const https = require("https");
// const https = require("https");

//const path = require("path");
//const app=require('./app');
// const cors = require('cors');


//configuraciones
const app = express();
const port_https = 8128;
// app.use(cors())


//middlewares
const cor = require('./src/middlewar/cors');
cor.initCors(app, express);

app.use(function (req, resp, next) {
  if (req.headers["x-forwarded-proto"] == "http") {
    return resp.redirect(301, "https://" + req.headers.host + "/");
  } else {
    return next();
  }
});


//Mensaje que se mmuestra en el navegador
app.get("/", (req, res) => {
  res.send("Bienvenidos Backend SIPLAN Plan Estratégico");
});
//rutas
app.use(require("./app"));

//credenciales para el https del servidor de windows
var options = {
  key: fs.readFileSync("Certificados/STAR_espoch_edu_ec.key"),
  cert: fs.readFileSync("Certificados/STAR_espoch_edu_ec.crt"),
  ca: fs.readFileSync("Certificados/STAR_espoch_edu_ec.crt"),
};
app.listen(port_https,()=>{
  console.log("Siplani esta corriendo en el puerto " + port_https)
})
//Inicializa el servidor
// const server1 = https.createServer(options, app);
// //// const server2 = http.createServer(app);

// ////crea servidor https
// server1.listen(port_https, () =>
//   console.log("Siplani esta corriendo en el puerto " + port_https)
// );