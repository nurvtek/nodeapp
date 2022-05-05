var fs = require('fs');

var path = require('path');
var Request = require("request");
var http = require('http');
var xml2js = require('xml2js');
var soapRequest = require('easy-soap-request'); 


var request = require('request');
function getHoras(codigo,anyo,sem,res){
	const url = 'http://zonagestion.ucsh.cl/wsAcad_L/wAcad_l.svc';
	const sampleHeaders = {
	  'user-agent': 'sampleTest',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/IwAcad_l/getHorarioDocente',
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getHorarioDocente>"
	+ "<tem:Anoa>"+anyo+"</tem:Anoa>"
	+ "<tem:vepe>"+sem+"</tem:vepe>"
	+ "<tem:rut>"+codigo+"</tem:rut>"
	+ "</tem:getHorarioDocente>"+"</soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getHorarioDocenteResponse"][0]["getHorarioDocenteResult"][0]["NewDataSet"][0];
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
function getValida(rut,password,res){
	var tipo = "3";
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
        var cant = result["Table1"].length;
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
	        console.log(retornador);
	   /*     try {
	            if(fs.existsSync('fnBuscarNombre.sdr')) {
	                console.log("The file exists.");
	            } else {
	                console.log('The file does not exist.');
	                fs.writeFile('fnBuscarNombre.sdr', retornador, function (err) {
	                	  if (err) return console.log(err);
	                	});
	            }
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


function getDatos(rut,res){
	if (rut==undefined)rut=" ";

	const url = 'http://zonagestion.ucsh.cl/WS_Acad_p/wAcad_p.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSAcad_p/getDatosDocente'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getDatosDocente>"
	+"<tem:rut>"+rut+"</tem:rut>"
	+"</tem:getDatosDocente></soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getDatosDocenteResponse"][0]["getDatosDocenteResult"][0]["NewDataSet"][0];
        var retornador ="[";
        try {
        var cant = result["Table1"].length;
        
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	       
	        retornador = retornador + "{" + "\"nomb_acad\":\""+resulta["nomb_acad"]+"\"" ;	
            retornador = retornador + ","+"\"carr_acad\":\""+resulta["carr_acad"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        
       } catch(f){}
       retornador = retornador+"]";
	        console.log(retornador);
	  
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
             
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}

function getDatosA(rut,nmat,res){
	if (rut==undefined)rut=" ";

	const url = 'http://zonagestion.ucsh.cl/WS_Acad_p/wAcad_p.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSAcad_p/getFichaEstudiante'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getFichaEstudiante>"
	+"<tem:rut>"+rut+"</tem:rut>"
	+"<tem:nmat>"+nmat+"</tem:nmat>"
	+"</tem:getFichaEstudiante></soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getFichaEstudianteResponse"][0]["getFichaEstudianteResult"][0]["NewDataSet"][0];
        var cant = result["Table1"].length;
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	       
	        retornador = retornador + "{" + "\"alum_rut\":\""+resulta["alum_rut"]+"\"" ;	
            retornador = retornador + ","+"\"alum_nmat\":\""+resulta["alum_nmat"]+"\"";
 retornador = retornador + ","+"\"nombre\":\""+resulta["nombre"]+"\"";
 retornador = retornador + ","+"\"alum_carr\":\""+resulta["alum_carr"]+"\"";
 retornador = retornador + ","+"\"carr_desc\":\""+resulta["carr_desc"]+"\"";
 retornador = retornador + ","+"\"alum_nive\":\""+resulta["alum_nive"]+"\"";
 retornador = retornador + ","+"\"mail_mail\":\""+resulta["mail_mail"]+"\"";
 retornador = retornador + ","+"\"foto\":\""+resulta["foto"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	        console.log(retornador);
	  
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
             
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}


function getCurso(anyo,vepe,rut,res){
	if (rut==undefined)rut=" ";
    if (anyo==undefined)anyo=" ";
    if (vepe==undefined)vepe=" ";
	const url = 'http://zonagestion.ucsh.cl/WS_Acad_p/wAcad_p.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSAcad_p/getCursosDocente'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getCursosDocente>"
	+"<tem:anoa>"+anyo+"</tem:anoa>"
	+"<tem:Vepe>"+vepe+"</tem:Vepe>"
	+"<tem:rut>"+rut+"</tem:rut>"
	+"</tem:getCursosDocente></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(xml);
	// usage of module
     var retornador ="[";
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
        var result = resultad["getCursosDocenteResponse"][0]["getCursosDocenteResult"][0]["NewDataSet"][0];
        console.log(resultad);
        if (result.hasOwnProperty("Table1"))
       {	
        var cant = result["Table1"].length;
        
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
	        resulta = result["Table1"][un];
	       
	        retornador = retornador + "{" + "\"hora_anoa\":\""+resulta["hora_anoa"]+"\"" ;	
            retornador = retornador + ","+"\"hora_vepe\":\""+resulta["hora_vepe"]+"\"";
            retornador = retornador + ","+"\"hora_asig\":\""+resulta["hora_asig"]+"\"";
            retornador = retornador + ","+"\"hora_secc\":\""+resulta["hora_secc"]+"\"";
            retornador = retornador + ","+"\"asig_nomc\":\""+resulta["asig_nomc"]+"\"";
            retornador = retornador + ","+"\"asig_desc\":\""+resulta["asig_desc"]+"\"";
            retornador = retornador + ","+"\"sede\":\""+resulta["sede"]+"\"";
            retornador = retornador + ","+"\"hora_vers\":\""+resulta["hora_vers"]+"\"";
            retornador = retornador + ","+"\"hora_clases\":\""+resulta["hora_clases"]+"\"";
            retornador = retornador + ","+"\"hora_func\":\""+resulta["hora_func"]+"\"";
            retornador = retornador + ","+"\"func_desc\":\""+resulta["func_desc"]+"\"";
            retornador = retornador + ","+"\"hora_nrgr\":\""+resulta["hora_nrgr"]+"\"";
            retornador = retornador + ","+"\"codigo\":\""+resulta["codigo"]+"\"";
            retornador = retornador + ","+"\"carr_tpro\":\""+resulta["carr_tpro"]+"\"";
            retornador = retornador + ","+"\"estudiantes\":\""+resulta["estudiantes"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	    
	        } 
       }
	        retornador = retornador+"]";
	         console.log(retornador);

	         res.send(retornador);
	  
    	});
    // console.log(datico);
	 })();
}
catch(e)
{
	retornador = retornador+"]";
	console.log(retornador);

	res.send(retornador);
	 try {
           if(fs.existsSync('fnBuscarNombre.sdr')) {
               console.log("The file exists.");
             
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

function getAsistencia(anyo,vepe,asig,secc,fecha,func,nrgr,res){
	
    if (anyo==undefined)anyo=" ";
    if (vepe==undefined)vepe=" ";
    if (asig==undefined)asig=" ";
    if (secc==undefined)secc=" ";
    if (fecha==undefined)fecha=" ";
    if (func==undefined)func=" ";
    if (nrgr==undefined)nrgr=" ";
	const url = 'http://zonagestion.ucsh.cl/wsAcad_L/wAcad_l.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/IwAcad_l/getAsistenciaCursoFuncion'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getAsistenciaCursoFuncion>"
	+"<tem:Anoa>"+anyo+"</tem:Anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:asig>"+asig+"</tem:asig>"
	+"<tem:secc>"+secc+"</tem:secc>"
	+"<tem:fecha>"+fecha+"</tem:fecha>"
	+"<tem:func>"+func+"</tem:func>"
	+"<tem:nrgr>"+nrgr+"</tem:nrgr>"
	+"</tem:getAsistenciaCursoFuncion></soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getAsistenciaCursoFuncionResponse"][0]["getAsistenciaCursoFuncionResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
	      cant = result["Table1"].length;
         }
       catch (pk){}
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
		        resulta = result["Table1"][un];
		       
		        retornador = retornador + "{" + "\"num\":\""+resulta["num"]+"\"" ;	
	            retornador = retornador + ","+"\"nombre\":\""+resulta["nombre"]+"\"";
	            retornador = retornador + ","+"\"nmat\":\""+resulta["nmat"]+"\"";
	            retornador = retornador + ","+"\"asistio\":\""+resulta["asistio"]+"\"";
	            retornador = retornador + ","+"\"rut\":\""+resulta["rut"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	        console.log(retornador);
	  
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
             
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}



function getNotasFinales(anyo,vepe,asig,secc,res){
	
    if (anyo==undefined)anyo=" ";
    if (vepe==undefined)vepe=" ";
    if (asig==undefined)asig=" ";
    if (secc==undefined)secc=" ";
  
	const url = 'http://zonagestion.ucsh.cl/wsAcad_L/wAcad_l.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/IwAcad_l/getNotaFinalCursoFuncion'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getNotaFinalCursoFuncion>"
	+"<tem:Anoa>"+anyo+"</tem:Anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:asig>"+asig+"</tem:asig>"
	+"<tem:secc>"+secc+"</tem:secc>"

	+"</tem:getNotaFinalCursoFuncion></soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getNotaFinalCursoFuncionResponse"][0]["getNotaFinalCursoFuncionResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
	      cant = result["Table1"].length;
         }
       catch (pk){}
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
		        resulta = result["Table1"][un];
		       
		        retornador = retornador + "{" + "\"num\":\""+resulta["num"]+"\"" ;	
	            retornador = retornador + ","+"\"nombre\":\""+resulta["nombre"]+"\"";
	            retornador = retornador + ","+"\"nmat\":\""+resulta["nmat"]+"\"";
	            retornador = retornador + ","+"\"notaf\":\""+resulta["notaf"]+"\"";
	            retornador = retornador + ","+"\"codsitf\":\""+resulta["codsitf"]+"\"";
                retornador = retornador + ","+"\"descsitf\":\""+resulta["descsitf"]+"\"";
                retornador = retornador + ","+"\"alum_rut\":\""+resulta["alum_rut"]+"\"";
	            retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	        console.log(retornador);
	  
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
             
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}
//   Ejemplo de funcionamiento


function getAsisteDoc(anyo,vepe,asig,secc,func,fecha,res){
	
    if (anyo==undefined)anyo=" ";
    if (vepe==undefined)vepe=" ";
    if (asig==undefined)asig=" ";
    if (secc==undefined)secc=" ";
    if (func==undefined)func=" ";
    if (fecha==undefined)fecha=" ";
  
	const url = 'http://zonagestion.ucsh.cl/WS_Acad_p/wAcad_p.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/WSAcad_p/getAsistenciaDocente'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getAsistenciaDocente>"
	+"<tem:anoa>"+anyo+"</tem:anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:asig>"+asig+"</tem:asig>"
	+"<tem:secc>"+secc+"</tem:secc>"
	+"<tem:func>"+func+"</tem:func>"
	+"<tem:fech>"+fecha+"</tem:fech>"
	+"</tem:getAsistenciaDocente></soapenv:Body>"+"</soapenv:Envelope>"; 
     var resultad = "Original";
     console.log(">=========================================================================================<");
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
        var result = resultad["getAsistenciaDocenteResponse"][0]["getAsistenciaDocenteResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
	      cant = result["Table1"].length;
         }
       catch (pk){}
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
		        resulta = result["Table1"][un];
		       
		        retornador = retornador + "{" + "\"num\":\""+resulta["num"]+"\"" ;	
	            retornador = retornador + ","+"\"tias_desc\":\""+resulta["tias_desc"]+"\"";
	            retornador = retornador + ","+"\"aspr_fech\":\""+resulta["aspr_fech"]+"\"";
	            retornador = retornador + ","+"\"aspr_modu\":\""+resulta["aspr_modu"]+"\"";
	            retornador = retornador + ","+"\"aspr_minu\":\""+resulta["aspr_minu"]+"\"";
            
	            retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	        console.log(retornador);
	  
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

// dgfhssssssssssssssjjjj

function getNotasParcial(anyo,vepe,asig,secc,version,func,nrgr,numnota,numcontrol,tipocredito,res){
	
    if (anyo==undefined)anyo=" ";
    if (vepe==undefined)vepe=" ";
    if (asig==undefined)asig=" ";
    if (secc==undefined)secc=" ";
    if (version==undefined)version=" ";
    if (func==undefined)func=" ";
    if (nrgr==undefined)nrgr=" ";
    if (numnota==undefined)numnota=" ";
    if (numcontrol==undefined)numcontrol=" ";
    if (tipocredito==undefined)tipocredito=" ";
    
	const url = 'http://zonagestion.ucsh.cl/wsAcad_L/wAcad_l.svc';
	const sampleHeaders = {
	  'user-agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
	  'Content-Type': 'text/xml;charset=UTF-8',
	  'soapAction': 'http://tempuri.org/IwAcad_l/getNotasParcialesCursoFuncion'
	};
	const xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:getNotasParcialesCursoFuncion>"
	+"<tem:Anoa>"+anyo+"</tem:Anoa>"
	+"<tem:vepe>"+vepe+"</tem:vepe>"
	+"<tem:asig>"+asig+"</tem:asig>"
	+"<tem:secc>"+secc+"</tem:secc>"
	+"<tem:version>"+version+"</tem:version>"
	+"<tem:func>"+func+"</tem:func>"
	+"<tem:nrgr>"+nrgr+"</tem:nrgr>"
	+"<tem:numNota>"+numnota+"</tem:numNota>"
	+"<tem:numControl>"+numcontrol+"</tem:numControl>"
	+"<tem:tipoCredito>"+tipocredito+"</tem:tipoCredito>"
	+"</tem:getNotasParcialesCursoFuncion></soapenv:Body>"+"</soapenv:Envelope>"; 
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
        var result = resultad["getNotasParcialesCursoFuncionResponse"][0]["getNotasParcialesCursoFuncionResult"][0]["NewDataSet"][0];
        var cant = 0;
        try {
	      cant = result["Table1"].length;
         }
       catch (pk){}
        var retornador ="[";
        
       var indica = 0;
        
	        for (var un=0; un< cant;un++)
	        {
	        	 var ind = 0;
	        	var original = retornador;
	        	if (indica>0) retornador = retornador +",";
		        resulta = result["Table1"][un];
		       
		        retornador = retornador + "{" + "\"nro\":\""+resulta["nro"]+"\"" ;	
	            retornador = retornador + ","+"\"nmat\":\""+resulta["nmat"]+"\"";
	            retornador = retornador + ","+"\"nombre\":\""+resulta["nombre"]+"\"";
	            retornador = retornador + ","+"\"porc_asis\":\""+resulta["porc_asis"]+"\"";
	            retornador = retornador + ","+"\"nota\":\""+resulta["nota"]+"\"";
	            retornador = retornador + ","+"\"rut\":\""+resulta["rut"]+"\"";
	        retornador = retornador +"}";
	         indica=1;
	        
	        } 
	        retornador = retornador+"]";
	        console.log(retornador);
	  
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
             
           } else {
               console.log('The file does not exist.');
             
           }
       } catch (err) {
           console.error(err);
       }
	
}
	return resultad;
}



// ioqueoiqwueipoeupqpepqo


//Get Genres
module.exports.getOkA = function(req, res){
	 var rut = req.query.rut;
	 var pas = req.query.password;

   var retorno = getValida(rut,pas, res);

};

module.exports.getDD = function(req, res){
	 var rut = req.query.rut;


   var retorno = getDatos(rut, res);

};
module.exports.getDA = function(req, res){
	 var rut = req.query.rut;
     var nmat = req.query.nmat;


   var retorno = getDatosA(rut,nmat, res);

};
	module.exports.getAsiste = function(req, res){
		var anyo = req.query.anyo;
		var vepe = req.query.vepe;
		var asig = req.query.asig;
		var secc = req.query.secc;
        var fecha = req.query.fecha;
        var func = req.query.func;
        var nrgr = req.query.nrgr;
	    var retorno = getAsistencia(anyo,vepe,asig,secc,fecha,func,nrgr,res);
	    // res.send('Implentando: Este es el Valor=');
	};
	module.exports.getNotasPar = function(req, res){
		var anyo = req.query.anyo;
		var vepe = req.query.vepe;
		var asig = req.query.asig;
		var secc = req.query.secc;
        var version = req.query.version;
        var func = req.query.func;
        var nrgr = req.query.nrgr;
        var numnota = req.query.numnota;
        var numcontrol = req.query.numcontrol;
        var tipocredito = req.query.tipocredito;
	    var retorno = getNotasParcial(anyo,vepe,asig,secc,version,func,nrgr,numnota,numcontrol,tipocredito,res);
	    // res.send('Implentando: Este es el Valor=');
	};
	module.exports.getCursos = function(req, res){
		var anyo = req.query.anyo;
		var vepe = req.query.vepe;
		var rut = req.query.rut;

	    var retorno = getCurso(anyo,vepe,rut,res);
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

    	module.exports.getNotFin = function(req, res){
	    var anyo = req.query.anyo;
		var vepe = req.query.vepe;
		var asig = req.query.asig;
		var secc = req.query.secc;
	    var retorno = getNotasFinales(anyo,vepe,asig,secc,res);
	    // res.send('Implentando: Este es el Valor=');
	};
	module.exports.getAsisDoc = function(req, res){
		var anyo = req.query.anyo;
		var vepe = req.query.vepe;
		var asig = req.query.asig;
		var secc = req.query.secc;
        var func = req.query.func;
        var fecha = req.query.fecha;

	    var retorno = getAsisteDoc(anyo,vepe,asig,secc,func, fecha,res);
	    // res.send('Implentando: Este es el Valor=');
	};
module.exports.getHorario = function(req, res){
	 var codigo = req.query.rut;
   // var codigo = "1611046";
   // var anyo ="2019";
   // var sem = "2";
    var anyo = req.query.anyo;
    var sem = req.query.sem;
  //  console.log("Este es el valor de codigo="+cantidad);
    var retorno = getHoras(codigo,anyo,sem, res);
    // res.send('Implentando: Este es el Valor=');
};