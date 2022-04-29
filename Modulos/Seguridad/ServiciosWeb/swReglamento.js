const express = require("express");
const router = express.Router();
const reglamento = require('../Consultas/sqlReglamento');
const multer = require('multer');
const fs = require('fs');
var url='C:/var';
const auth=require('../../Seguridad/Config/auth');
const oneDriveAPI = require("onedrive-api");
var request = require('request');
var async = require('async');
var mime = require('mime');
//const onedrive_json_configFile = fs.readFileSync('./config/onedrive.json', 'utf8');
//const onedrive_json_config = JSON.parse(onedrive_json_configFile);
//const onedrive_refresh_token = onedrive_json_config.refresh_token
let com=0;

// Servicio Listar Roles
router.get("/ListaCodigo", auth, (req, res) => {
  try {
    reglamento.codigoR((err, reglamento) => {
      return res.json({data: reglamento });
    });
  } catch (error) {
    return res.json({ success: false, info: error });
  }
});

// Servicio Listar Reglamentos
router.get("/ListaReglamentos", auth,  (req, res) => {
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
router.get("/ListaReglamentosAc", auth, (req, res) => {
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
router.post("/CodigoModificar", auth, (req, res) =>{
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
/*router.post('/archivo', upload.array('demo[]'), (req, res)=>{
       res.json({mensaje:"Archivo subido"});
});*/




const conexion={
  url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  form: {
    redirect_uri: 'https://localhost:4200',
    client_id: "598a77c2-45d2-4168-8075-e03832ad0ba4",
    client_secret: "~La7Q~D0sksSkIahrau5XlrrGGpdsXBKhnd5V",
    //refresh_token: onedrive_refresh_token,
    grant_type: 'authorization_code'
  }
}






var file = "C:/Users/WinUser/Documents/correosPlanificacion.pdf";
var refresh_token = "#####";
var onedrive_folder = 'SampleFolder'; // Folder on OneDrive
var onedrive_filename = file; // If you want to change the filename on OneDrive, please set this.


function resUpload(){
  request.post({
      url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      form: {
          client_id: "598a77c2-45d2-4168-8075-e03832ad0ba4",
          client_secret: "~La7Q~D0sksSkIahrau5XlrrGGpdsXBKhnd5V",
          redirect_uri: 'https://localhost:4200',
          grant_type: "refresh_token",
          refresh_token: refresh_token,
      },
  }, function(error, response, body) { // Here, it creates the session.
      request.post({
          url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/createUploadSession',
          headers: {
              'Authorization': "Bearer " + JSON.parse(body).access_token,
              'Content-Type': "application/json",
          },
          body: '{"item": {"@microsoft.graph.conflictBehavior": "rename", "name": "' + onedrive_filename +'"}}',
      }, function(er, re, bo) {
          uploadFile(JSON.parse(bo).uploadUrl);
      });
  });
}

function uploadFile(uploadUrl) { // Here, it uploads the file by every chunk.
  async.eachSeries(getparams(), function(st, callback){
      setTimeout(function() {
          fs.readFile(file, function read(e, f) {
              request.put({
                  url: uploadUrl,
                  headers: {
                      'Content-Length': st.clen,
                      'Content-Range': st.cr,
                  },
                  body: f.slice(st.bstart, st.bend + 1),
              }, function(er, re, bo) {
                  console.log(bo);
              });
          });
          callback();
      }, st.stime);
  });
}

function getparams(){
  var allsize = fs.statSync(file).size;
  var sep = allsize < (60 * 1024 * 1024) ? allsize : (60 * 1024 * 1024) - 1;
  var ar = [];
  for (var i = 0; i < allsize; i += sep) {
      var bstart = i;
      var bend = i + sep - 1 < allsize ? i + sep - 1 : allsize - 1;
      var cr = 'bytes ' + bstart + '-' + bend + '/' + allsize;
      var clen = bend != allsize - 1 ? sep : allsize - i;
      var stime = allsize < (60 * 1024 * 1024) ? 5000 : 10000;
      ar.push({
          bstart : bstart,
          bend : bend,
          cr : cr,
          clen : clen,
          stime: stime,
      });
  }
  return ar;
}

//Prueba para subir al onedrive
function fileprueba(){
request.post({
  url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  form: {
      client_id: "598a77c2-45d2-4168-8075-e03832ad0ba4",
      client_secret: "~La7Q~D0sksSkIahrau5XlrrGGpdsXBKhnd5V",
      redirect_uri: 'https://localhost:4200',
      refresh_token: reglamento.getToken(),
      grant_type: 'refresh_token'
  },
}, function(error, response, body) {
  fs.readFile(file, function read(e, f) {
      request.put({
          url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
          headers: {
              'Authorization': "Bearer " + JSON.parse(body).access_token,
              'Content-Type': mime.getType(file), // When you use old version, please modify this to "mime.lookup(file)",
          },
          body: f,
      }, function(er, re, bo) {
          console.log(bo);
      });
  });
});
}

//Ruta en donde se sube los archivos
router.post('/archivo', upload.array('demo'), (req, res)=>{
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
router.post("/IngresarReglamento/", auth, (req, res) => {
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
router.post("/ModificarReglamento/", auth, (req, res) => {
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
router.post("/EliminarArchivoBD/", auth, (req, res) => {
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