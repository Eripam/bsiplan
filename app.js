const express=require('express');

const app = express();

//Cors Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Middlewars
app.use(express.json());

app.use(require("./Modulos/Seguridad/Rutas/rutasInternas"));
app.use(require("./Modulos/Prospectiva/Rutas/rutasInternas"));
app.use(require("./Modulos/Reportes/Rutas/rutasInternas"));
app.use(require("./Modulos/Estrategico/Rutas/rutasInternas"));

module.exports=app;