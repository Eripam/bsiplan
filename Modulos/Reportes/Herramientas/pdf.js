module.exports.font=function(){
  var fonts = {
    Roboto: {
        normal: __dirname+'../../Herramientas/fonts/Roboto-Regular.ttf',
        bold: __dirname+'../../Herramientas/fonts/Roboto-Medium.ttf',
        italics: __dirname+'../../Herramientas/fonts/Roboto-Italic.ttf',
        bolditalics: __dirname+'../../Herramientas/fonts/Roboto-MediumItalic.ttf'
    }
  }
  return fonts;
}

module.exports.header=function (){
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

module.exports.footer=function (){
  var footer=[{
    margin: [180, 0, 0, 20],
    image:__dirname+'/img/Pie de página.png',
    width:250
  }]
  return footer;
}

module.exports.footerH=function (){
  var footer=[{
    margin: [300, 0, 0, 20],
    image:__dirname+'/img/Pie de página.png',
    width:240
  }]
  return footer;
}