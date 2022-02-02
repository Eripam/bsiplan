const express = require("express");
const router = express.Router();
const reglamento = require('../Consultas/sqlReglamento');
const multer = require('multer');
const fs = require('fs');
var url='C:/var';
let com=0;

// Servicio Listar Roles
router.get("/ListaCodigo", (req, res) => {
  try {
    reglamento.codigoR((err, reglamento) => {
      return res.json({data: reglamento });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Reglamentos
router.get("/ListaReglamentos", (req, res) => {
  var lstReg = null;
  try {
    reglamento.Reglamentos((err, reglamento) => {
      lstReg = reglamento;
      if (lstReg == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: reglamento });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Reglamentos
router.get("/ListaReglamentosAc", (req, res) => {
  var lstReg = null;
  try {
    reglamento.ReglamentoActivos((err, reglamento) => {
      lstReg = reglamento;
      if (lstReg == null) {
        salida = false;
      } else {
        salida = true;
      }
      return res.json({ success: salida, data: reglamento });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Variable para configuración de subida de archivo
const storage = multer.diskStorage({
  //Destino del archivo
  destination: function (req, file, cb) {
    cb(null, url)
  },
  //Configuración del nombre del archivo
  filename: async function (req, file, cb) {
    const uniqueSuffix = await obtenerCodigo();
    cb(null, uniqueSuffix+'-'+file.originalname)
  }
});

// Servicio Listar Reglamentos
router.post("/CodigoModificar", (req, res) =>{
  var codigo=req.body.reg_codigo;
  console.log("URL codifo "+codigo);
  if(codigo>0){
    return codigo, res.json({success:true});
  }else{
    return res.json({success:false});
  }
});

//Función para obtener el código del reglamento y subir el archivo
async function obtenerCodigo(){
  var codigo = await new Promise(resolve => { reglamento.codigoR((err, resul) => { resolve(resul);}) });
  return codigo[0].f_codigo_seguridad;
}

/*async function codigomodificar(codigo){
  console.log(codigo);
  com=codigo;
}*/

//Variable para subir archivos
const upload = multer({
  //ruta en donde se guardará el archivo y cambio de nombre del archvo
  storage
});

//Variable para configuración de subida de archivo
const storageM = multer.diskStorage({
  //Destino del archivo
  destination: function (req, file, cb) {
    cb(null, url)
  },
  //Configuración del nombre del archivo
  filename: function (req, file, cb) {
    console.log("Prueba codigo ");
    cb(null, '-'+file.originalname)
  }
});

//Variable para subir archivos
const uploadM = multer({
  //ruta en donde se guardará el archivo y cambio de nombre del archvo
  storage:storageM
});

//Ruta en donde se sube los archivos
router.post('/archivo', upload.array('demo[]'), (req, res)=>{
       res.json({mensaje:"Archivo subido"});
});

//Ruta en donde se sube los archivos
router.post('/archivoM', uploadM.array('demoM'), (req, res)=>{
  res.json({mensaje:"Archivo subido"});
});

//Ruta para eliminar archivo desde la carpeta
router.post('/eliminararchivo', (req, res)=>{
  //validación si existe el archivo
  fs.stat(url+'/'+req.body.archivo, function (err, stats) {
    if (err) {
        return res.json({success:false, info:err});
    }

    //Eliminación de archivo
    fs.unlink(url+'/'+req.body.archivo,function(err){
        if(err) return res.json({success:false, info:err});
        res.json({success:true});
    });  
  });
});

//Servicios ingresar Reglamento
router.post("/IngresarReglamento/", (req, res) => {
  var count=0, result;
  try {
    reglamento.IngresarReglamento(req, function (data) {
      for(var i=0; i<req.body.archivos.length; i++){
       result = new Promise(resolve => { reglamento.IngresarArchivosReglamento(req.body.reg_codigo, req.body.archivos[i], (err, resul) => { resolve(resul);}) });
       if(result){
         count++;
       }
      }
      if(count==req.body.archivos.length){
        return res.json({ success: data });
      }else{
        return res.json({ success: false });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios modificar Reglamento
router.post("/ModificarReglamento/", (req, res) => {
  var count=0, result;
  try {
    reglamento.ModificarReglamento(req, function (data) {
      if(req.body.archivos.length>0){
        for(var i=0; i<req.body.archivos.length; i++){
        result = new Promise(resolve => { reglamento.IngresarArchivosReglamento(req.body.reg_codigo, req.body.archivos[i], (err, resul) => { resolve(resul);}) });
        if(result){
          count++;
        }
        }
      }
      if(count==req.body.archivos.length){
        return res.json({ success: data });
      }else{
        return res.json({ success: false });
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

//Servicios Eliminar archivo base de datos
router.post("/EliminarArchivoBD/", (req, res) => {
  var count=0, result;
  try {
    reglamento.SumaArchivos(req.body.rar_reglamento, function (data) {
      if(data[0].count>1){
        try {
          reglamento.EliminarArchivos(req, function(data){
            return res.json({success:data});
          })
        } catch (error) {
          return res.json({ success: false, info: error });
        }
      }else{
        return res.json({success:false});
      }
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

module.exports = router;