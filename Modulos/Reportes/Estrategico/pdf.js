const fs= require("fs");
const PDF = require("pdfmake");
const estructura = require("../Herramientas/pdf");
const plan = require("../../Estrategico/Consultas/sqlPlan");
const cronograma=require("../../Estrategico/Consultas/sqlCronograma");
const Base64Stream = require('base64-stream');


var doc = new PDF(estructura.font());
module.exports.generarPDF=async function (req, callback) {
  /*doc.pipe(res);
  header(doc);
  doc
    .text('Reporte SISTEMA INTEGRAL DE PLANIFICACIÓN INSTITUCIONAL', 100, 300)
    .font('Times-Roman', 36);
  doc.end();
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
  });*/

let content = [{
    text: "Programación General del Plan",
    alignment: 'center',
    fontSize: 20
}]

var col=[];
//req.params.id
await plan.ListarPlan(req.body.codigo, (err, resp) => {
  var fechai=new Date(resp[0].plan_fecha_inicio);
  var anioi=fechai.getFullYear();
  var fechaf=new Date(resp[0].plan_fecha_fin);
  var aniof=fechaf.getFullYear();
  for(var i=anioi; i<=aniof; i++){
    col.push(i);
  }
});

var width=['*']
var anio=[{}];
for(var i=0; i<col.length; i++){
  width.push(70);
  anio.push({text:col[i], alignment: 'center',
  fillColor:'#858585',
  bold:true});
}

var encabezado=[];
encabezado.push({text:'Nombre', rowSpan:2, alignment: 'center', fillColor:'#858585', bold:true}, 
  {text: 'Programación Plurianual (%)', alignment: 'center', colSpan:col.length, alignment: 'center', fillColor:'#858585', bold:true});
for(var i=0; i<col.length-1; i++){
  encabezado.push({},);
}

var resul=[]
const resultado=await cronograma.ListarCronogramaPdf(req.body.codigo);
for(let res of resultado){
  var row = new Array();
  if(res.orden==0){
    row.push({text:res.nombre, colSpan:col.length+1, alignment:'left', fontSize:13 ,bold:true, fillColor:'#999999'});
  }else if(res.orden==1){
    if(res.total>0 && res.total<100){
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:12, fillColor:'#ADADAD', color:'red'});
    }else{
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:12, fillColor:'#ADADAD'});
    }
  }else if(res.orden==2){
    if(res.total>0 && res.total<100){
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:11, fillColor:'#C2C2C2', color:'red'});
    }else{
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:11, fillColor:'#C2C2C2'});
    }
  }else{
    if(res.total>0 && res.total<100){
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:10, color:'red'});
    }else{
      row.push({text:res.codigo+'.'+res.nombre, alignment:'left', fontSize:10});
    }
  }
  for(let j=0; j<col.length; j++){
    const resultado2=await cronograma.ListarCronogramaAnio(res.codigoid, col[j]);
    if(resultado2){
      for(let res2 of resultado2){
        if(res.orden==1){
          row.push({text:res2.cro_valor+'%', alignment:'center', fontSize:12, bold:true,fillColor:'#ADADAD'});
        }else if(res.orden==2){
          row.push({text:res2.cro_valor+'%', alignment:'center', fontSize:11, fillColor:'#C2C2C2'});
        }else{
          row.push({text:res2.cro_valor+'%', alignment:'center', fontSize:10});
        }
      }
    }else{
      if(res.orden==1){
        row.push({text:'--', alignment:'center',fillColor:'#ADADAD', bold:true,fontSize:12});
      }else if(res.orden==2){
        row.push({text:'--', alignment:'center',fillColor:'#C2C2C2',fontSize:11});
      }else{
        row.push({text:'--', alignment:'center',fontSize:10});
      }
    }
  }
  if(resul.length==0){
    resul.push(encabezado);
    resul.push(anio);
    resul.push(row);
  }else{
    resul.push(row);
  }
}

let table = {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  headerRows: 2,
  widths: width,
  body: 
    resul
}

let headerfooterDoc = {
  header: {
    columns: estructura.header()
  },
  footer: {
      columns: estructura.footerH()
  },
  content: content,
  pageMargins: [72, 120, 72, 50],
  pageOrientation:'landscape',
  //orientación horizontal landscape y para vertical portrait
}

headerfooterDoc['content'].push({
  text: "",
  style: 'subheader'
}, {
  table: table
})

/*let pdfDoc = doc.createPdfKitDocument(headerfooterDoc, {});
    pdfDoc.pipe(res);
    pdfDoc.end();
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
    });*/
    let pdfDoc = doc.createPdfKitDocument(headerfooterDoc, {});
    //pdfDoc.pipe(fs.createWriteStream('pdfs/test.pdf'));
    pdfDoc.end();
    var finalString='';
    var base64Stream = pdfDoc.pipe(new Base64Stream.Base64Encode());
    base64Stream.on('data', function(chunk){
      finalString+=chunk
    })

    base64Stream.on('end', function(){
      callback(true, finalString);
    });
    //console.log(pdfDoc.pipe(new Base64Stream.Base64Encode()).pipe(res));
    //return(pdfDoc.pipe(new Base64Stream.Base64Encode()).pipe(res));
}