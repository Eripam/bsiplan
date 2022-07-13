const fs= require("fs");
//const PDF = require("pdfkit");
const PDF = require("pdfmake");
const blobStream  = require('blob-stream');
const iframe = require("node-iframe");

/*function header(doc){
  doc.image(__dirname+'/img/Banderín.png', 20, 0, {fit: [100, 100], align: 'start', valign: 'center'}, doc.page.height-50);  
  doc.image(__dirname+'/img/Espoch-Dtic.png', 70, 50);
  doc.image(__dirname+'/img/Pie de página.png', 50, 730);
}*/

function header(){
  var columna=[{
    margin: [20, 0, 0, 0],
    alignment: 'start',
    image: __dirname+'/img/Banderín.png',
    height:100,
    width:50
  },{
    margin:[30, 55, 0, 0],
    image: __dirname+'/img/Espoch-Dtic.png',
    width:200
  }] 
  return columna;
}

function footer(){
  var footer=[{
    margin: [180, 0, 0, 20],
    image:__dirname+'/img/Pie de página.png',
    width:250
  }]

  return footer;
}

module.exports.generarPDF=async function (req, res) {
  var fonts = {
    Roboto: {
        normal: __dirname+'/fonts/Roboto-Regular.ttf',
        bold: __dirname+'/fonts/Roboto-Medium.ttf',
        italics: __dirname+'/fonts/Roboto-Italic.ttf',
        bolditalics: __dirname+'/fonts/Roboto-MediumItalic.ttf'
    }
};
  var doc = new PDF(fonts);
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
    text: "Hello World",
    alignment: 'center',
    fontSize: 25
}]

for (let i = 0; i < 50; i++) {
  content.push({
      text: `${i}) a random test.. `
  })
}

let table = {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  headerRows: 3,
  widths: ['*', 'auto', 100, 60, 50, 60, 50],

  body: [
      [{
          text: 'Name',
          rowSpan: 3
      }, {
          text: 'Age',
          rowSpan: 3
      }, {
          text: 'Gender',
          rowSpan: 3
      }, {
          text: 'Mark',
          alignment: 'center',
          colSpan: 4
      }, {}, {}, {}],
      [{}, {}, {}, {
          text: 'First Year',
          alignment: 'center',
          colSpan: 2
      }, {}, {
          text: 'Second year',
          alignment: 'center',
          colSpan: 2
      }, {}],
      [{}, {}, {}, {
          text: 'Theory',
          bold: true
      }, {
          text: 'Practical',
          bold: true
      }, {
          text: 'Theory',
      }, {
          text: 'Practical',
      }],
      // now data and values
      ['Ram', '32', 'Male', '90', '95', '80', '95'],
      ['Sita', '30', 'Female', '95', '95', '80', '95'],
      ['Laxman', '26', 'Male', '70', '90', '75', '90'],
  ]
}

let headerfooterDoc = {
  header: {
    columns: header() 
  },
  footer: {
      columns: footer()
  },
  content: content,
  pageMargins: [72, 120, 72, 50],
  pageOrientation:'portrait',
  //orientación horizontal landscape
}

headerfooterDoc['content'].push({
  text: "Table Now",
  style: 'subheader'
}, {
  table: table
})

let pdfDoc = doc.createPdfKitDocument(headerfooterDoc, {});
    pdfDoc.pipe(res);
    pdfDoc.end();
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
    });
}