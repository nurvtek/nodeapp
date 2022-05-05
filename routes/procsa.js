const request = require('request');
const fs = require('fs');
var crypto = require("crypto");
var express = require('express');
var mysql = require('mysql');
const db = require("../models");
var globalNro = "";
const Response = db.response;
const Test = db.test;
const Op = db.Sequelize.Op;
var router = express.Router();
const xlsxFile = require('read-excel-file/node');
const con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'N057r4d4mu$',
  port     : 3306,
  database : 'Tuwe'
}); 

function level(valor)
{
   return (valor.toString().split(".").length - 1);
}

function sveTest(id, tipo, titulo, filenme, descripcion)
{
  const test = {
    identifica: id,
    tipo: tipo,
    titulo: titulo,
    file: filenme,
    descripcion: descripcion
  };
  // Guardar usuario en la bese de datos
  Test.create(test)
    .then(data => {
      return data;
    })
    .catch(err => {
      return {
        message: "Algunos errores acurrieron mientras se creaba la Respuesta."
      };
     
    });
 
  return "ok";
}


function sveDB(id, tipo, titulo, archivo, filenme, pagina){

  var retorno = sveTest(id, tipo, titulo, filenme, titulo);
  let stmt = "INSERT INTO 2W_INSTORG(ID, TPO, TITULO, ARCHIVO, FLENME, PAGE) VALUES(?,?,?,?,?,?);";
 
  // execute the insert statment
  con.query(stmt,[id, tipo, titulo, archivo, filenme, pagina], (err, results) => {
    if (err) {
      console.log('Page saved!'+err.message);
      return (err.message);
    }  
    if(results){  
      console.log(results.insertId);
     //    console.log(JSON.parse(results));
        return (results.insertId);
     }
  });

  
}
function hvSon(row,ind){
  var indi = 0;
  if (globalNro == null)  globalNro = row[ind][0];
  var act = (globalNro.toString().split(".").length - 1);
  var inte = ind;
  
  console.log("Tamaño de la matriz");
  console.log(row.length);
  var auxiliar = globalNro;
  while (inte < (row.length-1) && globalNro ==  auxiliar)
  {
    inte++;
    if (row[inte][0] == null) auxiliar = globalNro;
    else auxiliar = row[inte][0];
  } 
  var neu = 0;
  console.log("Valor que da error");
  console.log(inte);
  console.log(auxiliar);
  if (inte != row.length)
  {
      neu = (auxiliar.toString().split(".").length - 1);
      neu = neu -act;
  }
  else 
  {
    neu = 0;
  }
  return neu;
}

function svaPtos(idp, codigo, lvel,sublevel,plev,punt, fodaf,fodao,fodad,fodaa)
{
  const response = {
    idproc: idp,
    codigo: codigo,
    level: lvel,
    sublevel: sublevel,
    codpre: plev,
    puntuacion: punt,
    fortaleza: fodaf,
    oportunidad: fodao,
    deficiencia: fodad,
    amenaza: fodaa

  };
  // Guardar usuario en la bese de datos
  Response.create(response)
    .then(data => {
      return data;
    })
    .catch(err => {
      return {
        message: "Algunos errores acurrieron mientras se creaba la Respuesta."
      };
     
    });
 
  return "ok";
}
module.exports = { 
getHomePage: (req, res, next) => {

  
    var msg = "Prueba Conexion";
    con.connect(function(err) {
      if (err){
         msg = "Error en la conexion 1= "+err;
         res.send(msg);
         return;
      } 
      msg = "Connected!";
      var sql = "CREATE TABLE 2W_INSTORG(ID VARCHAR(80), TPO VARCHAR(10), TITULO VARCHAR(255), ARCHIVO VARCHAR(255), FLENME VARCHAR(255), PAGE MEDIUMTEXT)";
      con.query(sql, function (err, result) {
        if (err){
          msg = "Error en la conexion 2= "+err;
          res.send(msg);
          return;
       } 
        msg = "Tabla 2W-INSTORG Creada";
        res.send(msg);
        return;
      });
    });  
},
getComputo: (req, res, next) => {
 // res.render('informeCumple');
  var codproc = req.query.codproc;
  elementos = [];
  var grap = "";
  var grap2 = "";
  var bases = [];
  var pagina = '<!DOCTYPE html><html><head><script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-core.min.js"></script><script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-radar.min.js"></script>';
  pagina = pagina + '<style type="text/css">html, body, #container {width: 100%; height: 100%;  margin: 0; padding: 0; }</style></head>';
  pagina = pagina + '  <body>\n<div style="text-align: center;"> \n<h1>Resultado del Test</h1><p class="lead"></p> \n';
  var condition = codproc ? { idproc: { [Op.like]: `%${codproc}%` } } : null;
  Response.findAll({ where: condition })
    .then(data => {
     // console.log(data);
     responses = [];
      for (var i=0;i< data.length; i++)
      {
         responses.push(data[i].dataValues);

      }
      console.log(">>>>>>>>>>>>>    VALOR DEL PROCESA   <<<<<<<<<<<<<<<<<<<<<<<<<")
     console.log(responses);
     var tot1 = 0;
     var tot2 = 0;
     var rtotl = 0;
     var rtots =0;
     var totl = 0;
     var tots = 0;
     var ctd = 0;
     var level = "";
     var sublevel = "";
     for (var ki = 0; ki < responses.length; ki++)
     {
        if (level != responses[ki].level)
        {
          if (level !="")
          {
            
            console.log("Total del Nivel:"+level);
            console.log(totl);
            console.log((totl/rtotl)*100);
            console.log("Total del SubNivel:"+sublevel);
            console.log(tots);
            console.log((tots/rtots)*100);
           
            var ptots = (tots/rtots)*100;
            pagina = pagina + "<h4> Total Subnivel "+sublevel+ "  ---> " + String(ptots)+ "</h4>";
            var ptotl = (totl/rtotl)*100;
            var opera="data"+ctd;
            pagina = pagina + "<h3> Total Nivel "+level+ "  ---> " + String(ptotl)+ "</h3>\n";
            pagina = pagina + "</div>\n";
            pagina = pagina + "</div>\n";
            pagina = pagina + "<div class='row'>\n";
            pagina = pagina + "<div>\n";
            pagina = pagina + '<div style="height: 700px" id="g'+opera+'"></div>\n';
            pagina = pagina + "</div>\n";
            pagina = pagina + "</div>\n";
         //   pagina = pagina +'\n<div class="container"> \n';
            pagina = pagina + '<div class="row" style="text-align: center;">\n<div>\n';
            grap = "var "+opera+ " = ["+ grap + "];\n";
            ctd++;
            bases.push(opera);
            elementos.push(grap);
            grap = "";
          //  pagina = pagina + "</div>";
          }else{
            pagina = pagina + '<div class="row" style="text-align: center;"><div >\n';
          }
          level = responses[ki].level;
          sublevel = responses[ki].sublevel;
          totl = 0;
          tots = 0;
          rtotl = 0;
          rtots = 0;
          console.log("Nivel");
          console.log(level);
          console.log("Subnivel");
          console.log(sublevel);
          
         // pagina = pagina + '<div class="col-lg-6">\n';
          pagina = pagina + "<hr>";
          pagina = pagina + "<h3>"+ level + "</h3>";
          pagina = pagina + "<h4>"+ sublevel + "</h4>";

        }
        if (sublevel != responses[ki].sublevel )
        {
          if (rtots > 0){
            console.log("Total del SubNivel:"+sublevel);
            console.log(tots);
            var ptots = (tots/rtots)*100;
            grap = grap +'{x: "'+ sublevel +'", value:'+ String(ptots)+'},';
            pagina = pagina + "<h4> Total Subnivel "+sublevel+ "  ---> " + String(ptots)+ "</h4>";
            console.log((tots/rtots)*100);
            sublevel = responses[ki].sublevel;
            tots = 0;
            rtots = 0;
            console.log("Subnivel");
            console.log(sublevel);
            pagina = pagina + "<hr>";
            pagina = pagina + "<h4>"+ sublevel + "</h4>";
          }
          else { sublevel = responses[ki].sublevel;}
         
        }
        
        tot1 = tot1 + Number(responses[ki].puntuacion);
        rtotl = rtotl + Number(responses[ki].puntuacion);
        rtots = rtots + Number(responses[ki].puntuacion);
        if (req.query[responses[ki].codigo]!=null)
        {
         if (Number(responses[ki].puntuacion) == Number(req.query[responses[ki].codigo]))
           {
         //    pagina = pagina + "<p>"+ responses[ki].puntuacion +" / "+ req.query[responses[ki].codigo] + "</p>\n";
             var contenido = "adasdas";
             contenido = responses[ki].fortaleza;
            if (contenido != null) contenido = contenido.trim();
             if (contenido.length > 2  )
                 pagina = pagina + "<p> Fortaleza: " + contenido + "</p>";
             contenido = responses[ki].oportunidad;
             
             if (contenido != null) contenido = contenido.trim();
             if (contenido.length > 2   )
                 pagina = pagina + "<p> Oportunidad: " + contenido + "</p>";
             contenido = responses[ki].deficiencia;
            
             if (contenido != null) contenido = contenido.trim();
             if (contenido.length > 2   )
                 pagina = pagina + "<p> Debilidad: " + contenido + "</p>";
            contenido = responses[ki].amenaza;
          
            if (contenido != null) contenido = contenido.trim();
            if (contenido.length > 2   )
                 pagina = pagina + "<p> Amenaza: " + contenido + "</p>";
           }
           if (Number(responses[ki].puntuacion) >0 )
           {
              totl = totl + Number(req.query[responses[ki].codigo]);
              tots = tots + Number(req.query[responses[ki].codigo]);
              tot2 = tot2 + Number(req.query[responses[ki].codigo]);
          }
        }
        else{
        //  console.log("Este codigo no lo encontro");
        //  console.log(responses[ki].codigo);
        }
      //  console.log(pagina);
     }
     
     var ptots = (tots/rtots)*100;
     pagina = pagina + "<h4> Total Subnivel "+sublevel+ "  ---> " + String(ptots)+ "</h4>";
     var ptotl = (totl/rtotl)*100;
     pagina = pagina + "<h3> Total Nivel "+level+ "  ---> " + String(ptotl)+ "</h3>";
     if (rtots > 0){
      
      console.log(tots);
      var ptots = (tots/rtots)*100;
      grap = grap +'{x: "'+ sublevel +'", value:'+ String(ptots)+'},';
    }
     var opera="data"+ctd;
     
            pagina = pagina + "<h3> Total Nivel "+level+ "  ---> " + String(ptotl)+ "</h3>";
            pagina = pagina + "\n</div>\n";
            pagina = pagina + "</div>\n";
            pagina = pagina + '\n<div style="height: 700px" id="g'+opera+'"></div>\n';
            
            grap = "var "+opera+ " = ["+ grap + "];\n";
            ctd++;
            bases.push(opera);
            elementos.push(grap);
            grap = "";
  
     pagina = pagina + '<footer class="footer"><p>&copy; CdoEnLinea 2021</p></footer><div id="kgdata1"></div></div></body>';
     pagina = pagina + "\n<script>\n anychart.onDocumentReady(function () {";
     for(var tr=0;tr<(elementos.length);tr++)
     {
       pagina = pagina + elementos[tr];
       pagina = pagina + "var chart"+tr+" = anychart.radar();\n ";
       pagina = pagina + "chart"+tr+".yScale()\n";
       pagina = pagina + "  .minimum(0)\n";
       pagina = pagina + "  .maximum(100)\n";
       pagina = pagina + "  .ticks({'interval':5});\n"
       pagina = pagina + ' chart'+tr+'.line('+bases[tr]+')\n chart'+tr+'.title("Resultado del Test'+tr+'"); chart'+tr+'.container("g'+bases[tr]+'");\n';
       pagina = pagina + 'chart'+tr+'.draw();\n';
     }
  
    
    pagina = pagina + '});\n';
     pagina = pagina + '</script>';


     pagina = pagina + '</html>';
       // console.log(req.query.r3.19);
        console.log("ESTE ES EL TOTAL NUMERO UNO");
        console.log(tot1);
        console.log("ESTE ES EL TOTAL NUMERO DOS");
        console.log(tot2);
        console.log((tot2/tot1)*100);
     //   console.log(pagina);
        
      /*  if (req.query["r3o19"] == null)  console.log("Esto es nulo");
        else console.log("Esto no es nulo");
        console.log(req.query["r3.19"]);
        console.log("TESTTTTTT 44444444444444444444444444");
        if (req.query["r3o44"] == null)  console.log("Esto es nulo");
        else console.log("Esto no es nulo");
        console.log(req.query["r3.44"]);*/
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.statusMessage = "Archivo listo para ser procesado";
        res.statusCode = 200;
        res.write(pagina);
        res.end();

    })
     .catch(err => {

      res.status(500).send({
         message:
          err.message || "Algunos errores se presentaron tratando de recuperar la lista de usuarios."
       });
     });
          

   //  res.render('informeCumple');

 // res.render('formulario');
         
},
letItbe: (req,res,next) => {
  var id = crypto.randomBytes(20).toString('hex');
  var alfa= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var titulo = req.query.titulo;
  var archivo = req.query.archivo;
  var tipolio = req.query.tipo;
  console.log('Este es el valor : \n Titulo='  + titulo +' \n Archivo='+ archivo + ' \n id='+ id + ' \n');
  xlsxFile(archivo).then((rows) => {
   // console.log(rows);
   var dominio = "";
   var subdominio = "";
   var lineas="";
   var valore = 0;
   const buffer = fs.readFileSync("cabecera.txt");
   lineas = buffer;

   lineas=lineas+'<br><br><hr></hr>\n';
   lineas=lineas+'<form action="/computador" method="get">\n';
   lineas = lineas + '<input type="hidden" id="codproc" name="codproc" value="'+id+'">';
   var r2 = 0;
   var r1 = "";
   var n1 = "";
   var j = 0;
   var kl = 0;
   while( rows[j][0]!="1")
   {
    j++;
   }
   var tronador = 0;
   var gr = 0;
   var term = [];
   var swwo = 0;
   var tipo = "";
   var lvel = "";
   var sublevel = "";
    for (var iu=j; iu < rows.length; iu ++){
      var elemento = "";
      elemento = rows[iu][0]+" ";
      elemento = elemento.trim();
      if (!(elemento > 0))
      {
         console.log("El elemento es nulo");
         console.log(rows[iu][0]);
         console.log("El elemento anterior");
         console.log(globalNro);
         elemento = globalNro;
      }
  //    else{
        var swwop = 0;
        var idp = id;
        var codigo = "";
        var lev = 0;
        var plev = globalNro;
        var punt = rows[iu][5];
        var fodaf = "";
        var fodao = "";
        var fodad = "";
        var fodaa = "";
        if (rows[iu][1]!=null) lvel = rows[iu][1];
        if (rows[iu][2]!=null) sublevel = rows[iu][2];
        if (rows[iu][6]!=null) fodaf = rows[iu][6];
        if (rows[iu][7]!=null) fodao = rows[iu][7];
        if (rows[iu][8]!=null) fodad = rows[iu][8];
        if (rows[iu][9]!=null) fodaa = rows[iu][9];
        if (rows[iu][0] != null) globalNro = rows[iu][0];
        else rows[iu][0] = globalNro;
        if (tipo == "") tipo = rows[iu][0];
        if (rows[iu][0] == null) tipo = globalNro;
        
        if (rows[iu][1]!=null && rows[iu][1]!=dominio )
        { 
          if (tronador == 1)
          {
          lineas = lineas +'</div>\n';
          tronador = 0;
          }
            tipo = globalNro;
            swwo =0;
          dominio = rows[iu][1];
          lineas=lineas+'<br><br><hr>\n';
          lineas=lineas+'<h2><strong>'+dominio+'</strong></h2>\n';
        }
        if (rows[iu][2]!=null && rows[iu][2]!=subdominio ) {
          if (tronador == 1)
          {
          lineas = lineas +'</div>\n';
          tronador = 0;
          }
            tipo = globalNro;
            swwo =0;
          subdominio = rows[iu][2];
          lineas=lineas+'<br><br><hr>\n';
          lineas=lineas+'<h4>'+subdominio+'</h4><hr></hr>\n';
        }
       if (rows[iu][3]!=null)
       { 
         if (valore==1)
         {
           kl=0;
           lineas=lineas+'<br><br><br>\n';
          lineas=lineas+'</fieldset>\n';
          valore =0;
         }
         else valore = 1;
         if (swwo==1 && tipo != globalNro)
          {
            tipo = globalNro;
            swwo = -1;
            gr--;
            tronador = 1;
            lineas = lineas + '<div id="'+ term[gr]+'" style="display:none">';
          }
          if (level(tipo) != level(globalNro) &&tipo != globalNro && swwo==-1 )
          {
      
            lineas = lineas +'</div>\n';
            tronador = 0;
            
            tipo = globalNro;
            swwo =0;
          }
         lineas=lineas+'<fieldset style="text-align: start;">\n';
         lineas=lineas+'<legend><strong>'+globalNro+'</strong>'+rows[iu][3]+'</legend>\n';
         r1 = globalNro;
         var temp = String(r1+r2);
        // temp = temp.replace(".","o");
         codigo = temp;
         if (rows[iu][4].toUpperCase() === 'SI' || rows[iu][4].toUpperCase() === 'NO')
         {
             var funcio ='rt'+r1;
             codigo = r1;
             lineas = lineas +'<div>\n';
             if (rows[iu][4].toUpperCase() === 'SI')
             {
              var nu = hvSon(rows,iu);
              if (nu==1)
              {
                lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'" onclick="rt(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
                swwop = 1;
                term[gr]= funcio;
                gr++;
                swwo = 1;
                tipo = globalNro;
              }
              else 
              {
                lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
                swwop = 1;
              }
              
             }
             else 
             {
               if (rows[iu][4].toUpperCase() === 'NO')
               {
                var nu = hvSon(rows,iu);
                codigo = r1;
                if (nu==1)
                {
                  lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'" onclick="rf(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
                  swwop = 1;
                }
                else{
                  lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
                  swwop = 1;
                }

               }
             }
            
              lineas = lineas + '<label for="'+r1+'" >'+rows[iu][4]+'</label><br></br>\n';
             lineas = lineas +'</div>\n';
         }
         else
         {
          
          lineas = lineas +'<div>\n';
          r1 = globalNro;
          r2++;
          var temp = String(r1+r2);
        //  temp = temp.replace(".","o");
          codigo =temp;
          var temp2 = rows[iu][4]; // alfa[kl]+') '+rows[iu][4];
          lineas = lineas + '<input type="checkbox" id="r'+temp+'" name="r'+temp+'"   value="'+rows[iu][5]+'">';
          swwop = 1;
          lineas = lineas + '<label for="'+temp+'" > '+temp2+' </label><br>';        
          lineas = lineas +'</div>\n';
          lineas=lineas+'<br>\n';
          kl++;
        }     
         
        // console.log(rows[iu][0]+"-"+dominio+"-"+subdominio+"-"+rows[iu][3]);
       }
       else{
        if (rows[iu][4].toUpperCase() === 'SI' || rows[iu][4].toUpperCase() === 'NO')
        {
            r1 = globalNro;
            r2++;
            var temp = String(r1+r2);
            // temp = temp.replace(".","o");
            codigo = temp;
            codigo = r1;
            lineas = lineas +'<div>\n';
            if (rows[iu][4].toUpperCase() === 'NO')
            {
                var nu = hvSon(rows,iu);
                if (nu==1)
                {
                  lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'" onclick="rf(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
                  swwop = 1;
                }
                else{
                  lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
                  swwop = 1;
                }

             }
             else 
             {
            lineas = lineas + '<input type="radio" id="r'+r1+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
            swwop = 1;
             }
            lineas = lineas + '<label for="'+r1+'" >'+rows[iu][4]+'</label><br></br>\n';
            lineas = lineas +'</div>\n';
        }
        else{

            lineas = lineas +'<div>\n';
            r1 = globalNro;
            r2++;
            var temp = String(r1+r2);
           // temp = temp.replace(".","o");
            codigo = temp;
            var temp2 = rows[iu][4]; //alfa[kl]+') '+rows[iu][4];
            lineas = lineas + '<input type="checkbox" id="r'+temp+'" name="r'+temp+'"   value="'+rows[iu][5]+'">';
            swwop = 1;
            lineas = lineas + '<label for="'+temp+'" > '+temp2+' </label><br>';        
            lineas = lineas +'</div>\n';
            lineas=lineas+'<br>\n';
            kl++;
        }

       }
        if (swwop == 1){
          codigo ='r'+ codigo;
           svaPtos(idp,codigo ,lvel ,sublevel ,plev ,punt , fodaf ,fodao ,fodad ,fodaa);
        }
//      }
    }
    if (valore==1)
         {
          lineas=lineas+'</fieldset>\n';
      //    lineas=lineas+'</form>\n';
          valore =0;
         }
         res.send("Procesando archivo ....");
         const buffer2 = fs.readFileSync("pie.txt");
   lineas = lineas + buffer2;
   var nomi = id;
   nomi = "public/"+nomi+ '.html';
   fs.writeFile(nomi, lineas, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    try{
      console.log(sveDB(id, tipolio, titulo, archivo, nomi, lineas));
    } catch(e){
      console.log(e);
    }
    console.log('Page saved!');
});
   // console.table(rows);
    // let datos = JSON.parse(rows);
   // console.log(datos);
   })
  
  
}

}