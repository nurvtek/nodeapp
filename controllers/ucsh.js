var fs = require('fs');

var path = require('path');
var Request = require("request");
var http = require('http');
var xml2js = require('xml2js');
var soapRequest = require('easy-soap-request'); 


var request = require('request');


function getHistoricoNotas(nmat,tipo,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getFichaHistoria',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getFichaHistoria>"
	+ "<tem:nmat>"+nmat+"</tem:nmat>"
	+ "<tem:tipo>"+tipo+"</tem:tipo>"
	+ "</tem:getFichaHistoria>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
          var resultad = "Original";
	// usage of module
     try{
	(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(xml);
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getFichaHistoriaResponse"][0]["getFichaHistoriaResult"][0]["NewDataSet"][0];
      //  result = result["Table1"][0]["lunes"][0];
     
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"vAgno\":\""+resulta["vAgno"]+"\"" ;	
	        retornador = retornador + ","+"\"vVepe\":\""+resulta["vVepe"]+"\"";
	        retornador = retornador + ","+"\"vAsig\":\""+resulta["vAsig"]+"\"";
	        retornador = retornador + ","+"\"vSecc\":\""+resulta["vSecc"]+"\"";
	        retornador = retornador + ","+"\"vDesc\":\""+resulta["vDesc"]+"\"";
	        retornador = retornador + ","+"\"vNotaP\":\""+resulta["vNotaP"]+"\"";
	        retornador = retornador + ","+"\"vNotaX\":\""+resulta["vNotaX"]+"\"";
	        retornador = retornador + ","+"\"vNotaF\":\""+resulta["vNotaF"]+"\"";
	        retornador = retornador + ","+"\"vSitF\":\""+resulta["vSitF"]+"\"";
	        retornador = retornador + ","+"\"vDescF\":\""+resulta["vDescF"]+"\"";
	        retornador = retornador + ","+"\"vCRed\":\""+resulta["vCRed"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	       // retornador = result;
	     // Guardar archivo si no existe
	        
	     //   Fin de guardado   
	        
	        
	        
	        
	        
         res.send(retornador);
    	});
    // c
	 })();
     }
     catch(e)
     {
   
	                console.error(e);

     }
	return resultad;
}


function getNotas(codigo,anyo,sem,asig,secc,version,codFuncion,grupo,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetNotas',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetNotas>"
	+ "<tem:Anoa>"+anyo+"</tem:Anoa>"
	+ "<tem:vepe>"+sem+"</tem:vepe>"
	+ "<tem:Asig>"+asig+"</tem:Asig>"
	+ "<tem:Secc>"+secc+"</tem:Secc>"
	+ "<tem:Version>"+version+"</tem:Version>"
	+ "<tem:CodFuncion>"+codFuncion+"</tem:CodFuncion>"
	+ "<tem:Grupo>"+grupo+"</tem:Grupo>"
	+ "<tem:Nmat>"+codigo+"</tem:Nmat>"
	+ "</tem:GetNotas>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
     try{
	(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(xml);
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetNotasResponse"][0]["GetNotasResult"][0]["NewDataSet"][0];
      //  result = result["Table1"][0]["lunes"][0];
     
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"tino\":\""+resulta["tino"]+"\"" ;	
	        retornador = retornador + ","+"\"fecha\":\""+resulta["fecha"]+"\"";
	        retornador = retornador + ","+"\"nume\":\""+resulta["nume"]+"\"";
	        retornador = retornador + ","+"\"pond\":\""+resulta["pond"]+"\"";
	        retornador = retornador + ","+"\"ctrl\":\""+resulta["ctrl"]+"\"";
	        retornador = retornador + ","+"\"fnot\":\""+resulta["fnot"]+"\"";
	        retornador = retornador + ","+"\"nota\":\""+resulta["nota"]+"\"";
	        retornador = retornador + ","+"\"anoa\":\""+resulta["anoa"]+"\"";
	        retornador = retornador + ","+"\"vepe\":\""+resulta["vepe"]+"\"";
	        retornador = retornador + ","+"\"asig\":\""+resulta["asig"]+"\"";
	        retornador = retornador + ","+"\"secc\":\""+resulta["secc"]+"\"";
	        retornador = retornador + ","+"\"vers\":\""+resulta["vers"]+"\"";
	        retornador = retornador + ","+"\"func\":\""+resulta["func"]+"\"";
	        retornador = retornador + ","+"\"nrgr\":\""+resulta["nrgr"]+"\"";
	        retornador = retornador + ","+"\"nmat\":\""+resulta["nmat"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	       // retornador = result;
	     // Guardar archivo si no existe
	        try {
	            if(fs.existsSync('GetNotas.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetNotas.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
	     //   Fin de guardado   
	        
	        
	        
	        
	        
         res.send(retornador);
    	});
    // c
	 })();
     }
     catch(e)
     {
    	 try {
	            if(fs.existsSync('GetNotas.sdr')) {
	                console.log("The file exists.");
	                fs.readFile( 'GetNotas.sdr', function (err, data) {
	          		  if (err) throw err;
	          		  console.log(data);
	          		res.send(data);
	          		});
	            } else {
	                console.log('The file does not exist.');
	              
	            }
	        } catch (err) {
	            console.error(err);
	        }
    	
     }
	return resultad;
}
function getCargas(codigo,anyo,sem,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetCargaConAcademico',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetCargaConAcademico>"
	+ "<tem:Anoa>"+anyo+"</tem:Anoa>"
	+ "<tem:Vepe>"+sem+"</tem:Vepe>"
	+ "<tem:Nmat>"+codigo+"</tem:Nmat>"
	+ "</tem:GetCargaConAcademico>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try{(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  datico = datico.replace(/"/g,"'");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetCargaConAcademicoResponse"][0]["GetCargaConAcademicoResult"][0]["NewDataSet"][0];
      //  result = result["Table1"][0]["lunes"][0];
        var retornador ="[";
        try{
        
        var cant = result["CargaConAcademicos"].length;
        
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["CargaConAcademicos"][un];
	        retornador = retornador + "{" + "\"asig\":\""+resulta["asig"]+"\"" ;	
	        retornador = retornador + ","+"\"seccion\":\""+resulta["seccion"]+"\"";
	        retornador = retornador + ","+"\"funcion\":\""+resulta["funcion"]+"\"";
	        retornador = retornador + ","+"\"grupo\":\""+resulta["grupo"]+"\"";
	        retornador = retornador + ","+"\"desc_asig\":\""+resulta["desc_asig"]+"\"";
	        retornador = retornador + ","+"\"docente\":\""+resulta["docente"]+"\"";
	        retornador = retornador + ","+"\"ticr\":\""+resulta["ticr"]+"\"";
	        retornador = retornador + ","+"\"cod_func\":\""+resulta["cod_func"]+"\"";
	        retornador = retornador + ","+"\"version\":\""+resulta["version"]+"\"";
	        
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
        } catch(ferr){}
	        retornador = retornador+"]";
	       // retornador = result;
	     
         res.send(retornador);
    	});
    // c
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetCargas.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetCargas.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
function getHoras(codigo,anyo,sem,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetHorarioEstudiante',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetHorarioEstudiante>"
	+ "<tem:Anoa>"+anyo+"</tem:Anoa>"
	+ "<tem:Vepe>"+sem+"</tem:Vepe>"
	+ "<tem:Nmat>"+codigo+"</tem:Nmat>"
	+ "</tem:GetHorarioEstudiante>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetHorarioEstudianteResponse"][0]["GetHorarioEstudianteResult"][0]["NewDataSet"][0];
      //  result = result["Table1"][0]["lunes"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +","
	        resulta = result["Table1"][un];
	      
	        retornador = retornador + "{" + "\"modulo\":\""+resulta["modulo"]+"\"" ;	
	        var lunes = resulta["lunes"];
	        if (lunes == "[object Object]") lunes = "";
	        	ind++;
	           retornador = retornador + ","+"\"lunes\":\""+lunes+"\"";
	        
	        var martes = resulta["martes"];
	        if (martes == "[object Object]")martes = "";
	        	ind++;
	           retornador = retornador + ","+"\"martes\":\""+martes+"\"";
	        
	        var miercoles = resulta["miercoles"];
	        if (miercoles == "[object Object]") miercoles = "";
	        	ind++;
	           retornador = retornador + ","+"\"miercoles\":\""+miercoles+"\"";
	        
	        var jueves = resulta["jueves"];
	        if (jueves == "[object Object]") jueves = "";
	        	ind++;
	           retornador = retornador + ","+"\"jueves\":\""+jueves+"\"";
	        
	        var viernes = resulta["viernes"];
	        if (viernes == "[object Object]") viernes = "";
	        	ind++;
	           retornador = retornador + ","+"\"viernes\":\""+viernes+"\"";
	        
	        var sabado = resulta["sabado"]; 
	        if (sabado == "[object Object]") sabado = "";
	        	ind++;
	           retornador = retornador + ","+"\"sabado\":\""+sabado+"\"";
	        
	        retornador = retornador +"}";
	        if (ind ==0)retornador = original; else indica=1;
	        }
	        retornador = retornador+"]";
	        try {
	            if(fs.existsSync('GetHoras.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetHoras.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
	}
	catch(e)
	{
		 try {
	           if(fs.existsSync('GetHoras.sdr')) {
	               console.log("The file exists.");
	               fs.readFile( 'GetHoras.sdr', function (err, data) {
	         		  if (err) throw err;
	         		  console.log(data);
	         		res.send(data);
	         		});
	           } else {
	               console.log('The file does not exist.');
	             
	           }
	       } catch (err) {
	           console.error(err);
	       }
		
	}
	return resultad;
}
function getPeriodos(res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetPeriodo',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetPeriodo/>"
	+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetPeriodoResponse"][0]["GetPeriodoResult"];
         var tex = result.toString();
         var dos = tex.split("|");
         var retornador = "{" + "\"total\":\""+result+"\"," 
        +"\"anyo\":\""+dos[0]+"\","
         +"\"sem\":\""+dos[1]+"\"}";

	        try {
	            if(fs.existsSync('GetPeriodos.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetPeriodos.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetHoras.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetHoras.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
function getFacultades(sede,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getFacultades',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getFacultades>"
	+"<tem:sede>"+sede+"</tem:sede>"
	+"</tem:getFacultades></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getFacultadesResponse"][0]["getFacultadesResult"][0]["NewDataSet"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"codigo\":\""+resulta["codigo"]+"\"" ;	
            retornador = retornador + ","+"\"facultad\":\""+resulta["facultad"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        try {
	            if(fs.existsSync('GetFacultades.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetFacultades.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetFacultades.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetFacultades.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}

function getEscuelas(facu,tipo,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getEscuelas',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getEscuelas>"
	+"<tem:facu>"+facu+"</tem:facu>"
	+"<tem:tipo>"+tipo+"</tem:tipo>"
	+"</tem:getEscuelas></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getEscuelasResponse"][0]["getEscuelasResult"][0]["NewDataSet"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"codigo\":\""+resulta["codigo"]+"\"" ;	
            retornador = retornador + ","+"\"escuela\":\""+resulta["escuela"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        try {
	            if(fs.existsSync('GetEscuelas.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetEscuelas.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetEscuelas.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetEscuelas.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
function getProgramas(escu,anoa,vepe,tipo,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getProgramas',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getProgramas>"
	+"<tem:escu>"+escu+"</tem:escu>"
	+"<tem:anoa>"+anoa+"</tem:anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:tipo>"+tipo+"</tem:tipo>"
	+"</tem:getProgramas></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(xml);
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getProgramasResponse"][0]["getProgramasResult"][0]["NewDataSet"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"codigo\":\""+resulta["codigo"]+"\"" ;	
            retornador = retornador + ","+"\"programa\":\""+resulta["programa"]+"\"";
            retornador = retornador + ","+"\"jornada\":\""+resulta["jornada"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        try {
	            if(fs.existsSync('GetProgramas.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetProgramas.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetProgramas.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetProgramas.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
function getOfertas(prog,anoa,vepe,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getOferta',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getOferta>"
	+"<tem:prog>"+prog+"</tem:prog>"
	+"<tem:anoa>"+anoa+"</tem:anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"</tem:getOferta></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(xml);
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getOfertaResponse"][0]["getOfertaResult"][0]["NewDataSet"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"asig_codi\":\""+resulta["asig_codi"]+"\"" ;	
            retornador = retornador + ","+"\"asig_desc\":\""+resulta["asig_desc"]+"\"";
            retornador = retornador + ","+"\"asig_secc\":\""+resulta["asig_secc"]+"\"";
            retornador = retornador + ","+"\"asig_cupo\":\""+resulta["asig_cupo"]+"\"";
            retornador = retornador + ","+"\"asig_modu\":\""+resulta["asig_modu"]+"\"";
            retornador = retornador + ","+"\"asig_jorn\":\""+resulta["asig_jorn"]+"\"";
            retornador = retornador + ","+"\"asig_acad\":\""+resulta["asig_acad"]+"\"";
            retornador = retornador + ","+"\"asig_ticr\":\""+resulta["asig_ticr"]+"\"";
            retornador = retornador + ","+"\"lifo_coej\":\""+resulta["lifo_coej"]+"\"";
            retornador = retornador + ","+"\"lifo_deej\":\""+resulta["lifo_deej"]+"\"";
            retornador = retornador + ","+"\"lifo_coli\":\""+resulta["lifo_coli"]+"\"";
            
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        try {
	            if(fs.existsSync('GetOfertas.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetOfertas.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetOfertas.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetOfertas.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
function getDatosPersonales(rut,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetDatosPersonales',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetDatosPersonales>"
	+ "<tem:Rut>"+rut+"</tem:Rut>"
	+ "</tem:GetDatosPersonales>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetDatosPersonalesResponse"][0]["GetDatosPersonalesResult"][0]["NewDataSet"][0];
        var vali= result["DatosPersonales"].length;
        
        result = result["DatosPersonales"][0];
         var retornador = "{" + "\"numMat\":\""+result["alum_nmat"]+"\"," 
         +"\"apellPat\":\""+result["pers_apat"]+"\","
         +"\"apellMat\":\""+result["pers_amat"]+"\","
         +"\"nombres\":\""+result["pers_nomb"]+"\","
          +"\"codCar\":\""+result["alum_carr"]+"\","
          +"\"alum_plan\":\""+result["alum_plan"]+"\","
          +"\"alum_nive\":\""+result["alum_nive"]+"\","
          +"\"anoa_plan\":\""+result["anoa_plan"]+"\","
          +"\"carrera\":\""+result["carr_desl"]+"\""
         +"}";
         if (vali>1)
        	 { 
		         var result2 = resultad["GetDatosPersonalesResponse"][0]["GetDatosPersonalesResult"][0]["NewDataSet"][0];
		         result2 = result2["DatosPersonales"][1];
		         var retornador2 = "{" + "\"numMat\":\""+result2["alum_nmat"]+"\"," 
		         +"\"apellPat\":\""+result2["pers_apat"]+"\","
		         +"\"apellMat\":\""+result2["pers_amat"]+"\","
		         +"\"nombres\":\""+result2["pers_nomb"]+"\","
		          +"\"codCar\":\""+result2["alum_carr"]+"\","
		          +"\"alum_plan\":\""+result2["alum_plan"]+"\","
		          +"\"alum_nive\":\""+result2["alum_nive"]+"\","
		          +"\"carrera\":\""+result2["carr_desl"]+"\""
		         +"}";
		         retornador = retornador+","+retornador2;
        	 }
         retornador = "["+retornador+"]";
         try {
	            if(fs.existsSync('GetDatosPer.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetDatosPer.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
   
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetDatosPer.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetDatosPer.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
// valida
function getValida(rut,password,res){
	var tipo = "1";
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/GetClave',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetClave>"
	+ "<tem:Rut>"+rut+"</tem:Rut>"
	+ "<tem:Clave>"+password+"</tem:Clave>"
	+ "<tem:tipo>"+tipo+"</tem:tipo>"
	+ "</tem:GetClave>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(xml);
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["GetClaveResponse"][0]["GetClaveResult"][0];
      
        if (result!="OK") result = "NOOK";
       
         var retornador = "{" + "\"val\":\""+result+"\"}";
    
         //retornador = "["+retornador+"]";
       
         res.send(retornador);
    	});
   
	 })();
}
catch(e)
{
	console.log("Error al validar");
	var retornador = "{" + "\"val\":\"NOOK\"}";
    
    retornador = "["+retornador+"]";
  
    res.send(retornador);
	
}
	return resultad;
}


//  Get Asistencia

function getPlanificacion(anoa,vepe,asig,secc,vers,func,nrgr, res){
	const url = 'http://zonagestion.ucsh.cl/wsAcad_L/wAcad_l.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/IwAcad_l/getPlanificacionNotas'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getPlanificacionNotas>"
	+"<tem:Anoa>"+anoa+"</tem:Anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:asig>"+asig+"</tem:asig>"
	+"<tem:secc>"+secc+"</tem:secc>"
	+"<tem:version>"+vers+"</tem:version>"
	+"<tem:func>"+func+"</tem:func>"
	+"<tem:nrgr>"+nrgr+"</tem:nrgr>"
	+"</tem:getPlanificacionNotas></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
  //   console.log('XML='+xml);
	// usage of module
     console.log(sampleHeaders);
     console.log(xml);
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
//	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
  //	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	   // console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
       // console.log('AQUIAUI YYYYYY ' +JSON.stringify(resultad));
         var result = resultad["getPlanificacionNotasResponse"][0]["getPlanificacionNotasResult"][0]["NewDataSet"][0];
         
       
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"tino\":\""+resulta["tino"]+"\"" ;	
            retornador = retornador + ","+"\"nume\":\""+resulta["nume"]+"\"";
            retornador = retornador + ","+"\"pond\":\""+resulta["pond"]+"\"";
            retornador = retornador + ","+"\"ctrl\":\""+resulta["ctrl"]+"\"";
            retornador = retornador +"}";
	         indica=1;
	        
	        } 
	       
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	
     
           console.error(e);
      
	
}
	return resultad;
}


function getAsistencia(anoa,tipe,vepe,asig,secc,nmat,vers,func,nrgr,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getAsistencia',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getAsistencia>"
	+"<tem:Anoa>"+anoa+"</tem:Anoa>"
	+"<tem:Tipe>"+tipe+"</tem:Tipe>"
	+"<tem:Vepe>"+vepe+"</tem:Vepe>"
	+"<tem:Asig>"+asig+"</tem:Asig>"
	+"<tem:Secc>"+secc+"</tem:Secc>"
	+"<tem:Nmat>"+nmat+"</tem:Nmat>"
	+"<tem:Vers>"+vers+"</tem:Vers>"
	+"<tem:Func>"+func+"</tem:Func>"
	+"<tem:Nrgr>"+nrgr+"</tem:Nrgr>"
	+"</tem:getAsistencia></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
  //   console.log('XML='+xml);
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
//	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
  //	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	   // console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
       // console.log('AQUIAUI YYYYYY ' +JSON.stringify(resultad));
         var result = resultad["getAsistenciaResponse"][0]["getAsistenciaResult"][0]["NewDataSet"][0];
         
       
        var cant = result["Table1"].length;
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"curs_sasi\":\""+resulta["curs_sasi"]+"\"" ;	
            retornador = retornador + ","+"\"asis_req\":\""+resulta["asis_req"]+"\"";
            retornador = retornador + ","+"\"asis_ing\":\""+resulta["asis_ing"]+"\"";
            retornador = retornador + ","+"\"asis_ina\":\""+resulta["asis_ina"]+"\"";
            retornador = retornador + ","+"\"sesiones\":\""+resulta["sesiones"]+"\"";
            retornador = retornador + ","+"\"asistencias\":\""+resulta["asistencias"]+"\"";
            retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        try {
	            if(fs.existsSync('GetAsistencia.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetAsistencia.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetAsistencia.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetAsistencia.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}

//  FFFFS      CAMBIO NUEVO PLAN DE ESTUDIOS
function PEstudios(nmat,res){
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/getPlanEstudios',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getPlanEstudios>"
	+ "<tem:Nmat>"+nmat+"</tem:Nmat>"
	+ "</tem:getPlanEstudios>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getPlanEstudiosResponse"][0]["getPlanEstudiosResult"][0]["NewDataSet"][0];
        var cant= result["Table1"].length;
       var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{"+ "\"rut\":\""+resulta["Column1"]+"\"," 
         +"\"plan\":\""+resulta["Column5"]+"\","
         +"\"nivel\":\""+resulta["Column6"]+"\","
         +"\"codigo\":\""+resulta["Column8"]+"\","
          +"\"actividad\":\""+resulta["Column9"]+"\","
          +"\"credito\":\""+resulta["Column11"]+"\","
          +"\"tipoCredito\":\""+resulta["Column10"]+"\","
          +"\"anyo\":\""+resulta["Column14"]+"\","
          +"\"periodo\":\""+resulta["Column15"]+"\","
          +"\"situacion\":\""+resulta["Column13"]+"\","
          +"\"nota\":\""+resulta["Column12"]+"\""
         +"}";
         indica=1;
	        
	        } 
	        retornador = retornador+"]";

         try {
	            if(fs.existsSync('GetPlanEstudios.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('GetPlanEstudios.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
	        } catch (err) {
	            console.error(err);
	        }
         res.send(retornador);
    	});
   
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('GetPlanEstudios.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'GetPlanEstudios.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
           res.send("[]");
       }

}
	return resultad;
}



function getLPersonas(apat,amat,nomb,tipo,res){
	if (apat==undefined)apat=" ";
	if (amat==undefined)amat=" ";
	if (nomb==undefined)nomb=" ";
	if (tipo==undefined)tipo="P";
	const url = 'http://zonagestion.ucsh.cl/wsclave/Ingresar.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSClave/fnBuscarNombre'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:fnBuscarNombre>"
	+"<tem:apat>"+apat+"</tem:apat>"
	+"<tem:amat>"+amat+"</tem:amat>"
	+"<tem:nomb>"+nomb+"</tem:nomb>"
	+"<tem:tipo>"+tipo+"</tem:tipo>"
	+"</tem:fnBuscarNombre></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(xml);
	// usage of module
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 2000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["fnBuscarNombreResponse"][0]["fnBuscarNombreResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
        	cant=result["Table1"].length;
        } catch (r){
        	cant = 0
        }
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	       
	        retornador = retornador + "{" + "\"rut\":\""+resulta["Column1"]+"\"" ;	
            retornador = retornador + ","+"\"apat\":\""+resulta["Column2"]+"\"";
            retornador = retornador + ","+"\"amat\":\""+resulta["Column3"]+"\"";
            retornador = retornador + ","+"\"nomb\":\""+resulta["Column4"]+"\"";
            retornador = retornador + ","+"\"tipo\":\""+resulta["Column5"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	       
	   /*     try {
	            if(fs.existsSync('fnBuscarNombre.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('fnBuscarNombre.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	           
	        } catch (err) {
	        	
	            console.error(err);
	            res.send("{}");
	        }*/
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
           if(fs.existsSync('fnBuscarNombre.sdr')) {
               console.log("The file exists.");
               fs.readFile( 'fnBuscarNombre.sdr', function (err, data) {
         		  if (err) throw err;
         		  console.log(data);
         		res.send(data);
         		});
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}






// IN FFFFS

function getCalendarioAcad(anop,res){
	const url = 'http://zonagestion.ucsh.cl/WS_Acad_p/wAcad_p.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSAcad_p/getCalendarioAcademico',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getCalendarioAcademico>"
	+"<tem:anop>"+anop+"</tem:anop>"
	+"</tem:getCalendarioAcademico></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
	// usage of module
	 console.log(xml);
	try {(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	//  console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
       resultad = parser.parseString(datico);
   //    parser.parseString(datico, (e, r) => { resultad = r });
	 console.log(JSON.stringify(datico));
	 parser.parseString(datico, function (err, resultados) {
	    console.log('ESTO ES XXXXX=====>'+JSON.stringify(resultados));
         resultad = resultados["s:Envelope"]["s:Body"][0];
        var result = resultad["getCalendarioAcademicoResponse"][0]["getCalendarioAcademicoResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
        cant = result["Table1"].length;} catch(f){cant = 0;}
        var retornador ="[";
        
        var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	        retornador = retornador + "{" + "\"mes\":\""+resulta["mes"]+"\"" ;	
            retornador = retornador + ","+"\"caa_resp\":\""+resulta["caa_resp"]+"\"";
            retornador = retornador + ","+"\"caa_fini\":\""+resulta["caa_fini"]+"\"";
            retornador = retornador + ","+"\"caa_fter\":\""+resulta["caa_fter"]+"\"";
            retornador = retornador + ","+"\"caa_texto\":\""+resulta["caa_texto"]+"\"";
          
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";

	        
         res.send(retornador);
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	 try {
         
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}

// OD DDDFGDFD 


module.exports.getPEstudio = function(req, res){
	 var nmat = req.query.nmat;


  var retorno = PEstudios(nmat, res);

};

module.exports.getAsis = function(req, res){
	 var anoa = req.query.anoa;
	 var tipe = req.query.tipe;
	 var vepe = req.query.vepe;
	 var asig = req.query.asig;
	 var secc = req.query.secc;
	 var nmat = req.query.nmat;
	 var vers = req.query.vers;
	 var func = req.query.func;
	 var nrgr = req.query.nrgr;
	 

     var retorno = getAsistencia(anoa,tipe,vepe,asig,secc,nmat,vers,func,nrgr, res);

};

module.exports.getHistoricoNot = function(req, res){
	var nmat = req.query.nmat;
	var tipo = req.query.tipo;
	var retorno = getHistoricoNotas(nmat,tipo, res);
	
}

module.exports.getPlani = function(req, res){
	 var anoa = req.query.anoa;
	 var vepe = req.query.vepe;
	 var asig = req.query.asig;
	 var secc = req.query.secc;
	 var vers = req.query.vers;
	 var func = req.query.func;
	 var nrgr = req.query.nrgr;
	 

     var retorno = getPlanificacion(anoa,vepe,asig,secc,vers,func,nrgr, res);

};
//Get Genres
module.exports.getOk = function(req, res){
	 var rut = req.query.rut;
	 var pas = req.query.password;

   var retorno = getValida(rut,pas, res);

};
module.exports.getHorarios = function(req, res){
	 var codigo = req.query.codigo;
   // var codigo = "1611046";
   // var anyo ="2019";
   // var sem = "2";
    var anyo = req.query.anyo;
    var sem = req.query.sem;
  //  console.log("Este es el valor de codigo="+cantidad);
    var retorno = getHoras(codigo,anyo,sem, res);
    // res.send('Implentando: Este es el Valor=');
};
module.exports.getCarga = function(req, res){
	 var codigo = req.query.codigo;
  // var codigo = "1611046";
  // var anyo ="2019";
  // var sem = "2";
   var anyo = req.query.anyo;
   var sem = req.query.sem;
 //  console.log("Este es el valor de codigo="+cantidad);
   var retorno = getCargas(codigo,anyo,sem, res);
   // res.send('Implentando: Este es el Valor=');
};
module.exports.getNota = function(req, res){
	 var codigo = req.query.codigo;
     var anyo = req.query.anyo;
     var sem = req.query.sem;
     var asig = req.query.asig;
     var secc = req.query.secc;
     var version = req.query.version;
     var codFuncion = req.query.codFuncion;
     var grupo = req.query.grupo;
//  console.log("Este es el valor de codigo="+cantidad);
  var retorno = getNotas(codigo,anyo,sem,asig,secc,version,codFuncion,grupo,res);
  // res.send('Implentando: Este es el Valor=');
};
module.exports.getDatos = function(req, res){
  //  var rut = "18697053";
   // var anyo ="2019";
   //  var sem = "2";
    var rut = req.query.rut;

    var retorno = getDatosPersonales(rut, res);
    // res.send('Implentando: Este es el Valor=');
};
module.exports.getPeriodo = function(req, res){
	    var retorno = getPeriodos(res);
	    // res.send('Implentando: Este es el Valor=');
	};
	module.exports.getFaculta = function(req, res){
		var sede = req.query.sede;
	    var retorno = getFacultades(sede,res);
	    // res.send('Implentando: Este es el Valor=');
	};
module.exports.getCalendario = function(req, res){
		var anop = req.query.anop;
	    var retorno = getCalendarioAcad(anop,res);
	    // res.send('Implentando: Este es el Valor=');
	};
module.exports.getOferta = function(req, res){
		var prog = req.query.prog;
		var anoa = req.query.anoa;
		var vepe = req.query.vepe;
	    var retorno = getOfertas(prog,anoa,vepe,res);
	    // res.send('Implentando: Este es el Valor=');
	};
module.exports.getEscuela = function(req, res){
		var facu = req.query.facu;
		var tipo = req.query.tipo;
	    var retorno = getEscuelas(facu,tipo,res);
	    // res.send('Implentando: Este es el Valor=');
	};
	module.exports.getPersonas = function(req, res){
		var apat = req.query.apat;
		var amat = req.query.amat;
		var nomb = req.query.nomb;
		var tipo = req.query.tipo;
	    var retorno = getLPersonas(apat,amat,nomb,tipo,res);
	    // res.send('Implentando: Este es el Valor=');
	};
module.exports.getPrograma = function(req, res){
		var escu = req.query.escu;
		var anoa = req.query.anoa;
		var vepe = req.query.vepe;
		var tipo = req.query.tipo;
	    var retorno = getProgramas(escu,anoa,vepe,tipo,res);
	    // res.send('Implentando: Este es el Valor=');
	};
