const express=require('express');
const path = require('path');
const app=express();
const centralizada = require('./Rutas/rutasCentralizada');

//settings
app.set('port', 3000)

//routes
app.get('/', (req, res)=>{
    res.send('Bienvenidos ')
})

app.listen(app.get('port'), ()=>{
    console.log(`Siplani esta corriendo en el puerto ${app.get('port')}`)
})

app.use('/rutaCentalizada', centralizada);