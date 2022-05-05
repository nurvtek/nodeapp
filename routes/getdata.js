/**
 * http://usejsdoc.org/
 */
var fs = require('fs');
var path = require('path');
var Request = require("request");
var http = require('http');
var xml2js = require('xml2js');
var soapRequest = require('easy-soap-request');


// var amqp = require('amqplib/callback_api');
var amqpConn = null;
// var ur="http://192.168.0.7";
var ur="http://127.0.0.1";
var r;
process.env.CLOUDAMQP_URL = 'amqp://localhost'
var pubChannel = null;
var offlinePubQueue = [];

function decode_base64(base64str, filename) {
  let buf = Buffer.from(base64str, 'base64');

  fs.writeFile(path.join(__dirname, '/public/', filename), buf, function(error) {
    if (error) {
	  throw error;
	  
    } else {
	  console.log('File created from base64 string!');


    }
  });
  r=500;
  fs.close;
  return true;
}
function getDaticos(codigo,anyo,sem,resp){
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
    var resultad = "";
	// usage of module
	(async () => {
	  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
	  const { headers, body, statusCode } = response;
	  console.log(headers);
	 // console.log(body["s:Envelope"]);
	  console.log(body);
	  var datico = body.replace(/(&lt;)/g,"<")
      datico = datico.replace(/(&gt;)/g,">");
	  datico = datico.replace(/(&#xD;)/g," ");
	  var parser = new xml2js.Parser();
	 // console.log(JSON.stringify(datico));
	  parser.parseString(datico, function (err, resultados) {
		    console.log(JSON.stringify(resultados));
		    resultad = resultados;
		});
    // console.log(datico);
	})();
	return JSON.stringify(resultad);
}
function getData(codigo,anyo,sem,resp){
	var retorno="";
	console.log("En el get Data=>"+codigo);
	var xml="<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
	"<soapenv:Header/>"+"<soapenv:Body>"+"<tem:GetHorarioEstudiante>"
	+ "<tem:Anoa>"+anyo+"</tem:Anoa>"
	+ "<tem:Vepe>"+sem+"</tem:Vepe>"
	+ "<tem:Nmat>"+codigo+"</tem:Nmat>"
	+ "</tem:GetHorarioEstudiante>"+"</soapenv:Body>"+"</soapenv:Envelope>";  
	var http_options = {
	  hostname: 'zonagestion.ucsh.cl',   
	  port: 80,
	  path: '/wsclave/Ingresar.svc',
	  method: 'POST',
	  headers: {
		'Content-Type': 'text/xml;charset=UTF-8',
		'SOAPAction': 'http://tempuri.org/WSClave/GetHorarioEstudiante',
		'connection': 'keep-alive',
		'Content-Length': xml.length
	  }
	}
	var notas = "";
	try{
		console.log("previo a la llamada de httprequest");

	var req = http.request(http_options, (res) => {
	  res.setEncoding('utf8');
	  console.log(res.data);
	  console.log('Result: \n' + JSON.stringify(res));
	  res.on('data', (chunk) => {
		var parser = new xml2js.Parser();
		var resulta = "a";
	console.log("Vamos aqui vamos");	
	// console.log(parser);
		parser.parseString( chunk, function( err, resulta ) { 
			console.log(resulta);
		   notas=resulta; // ["s:Envelope"][0]["s:Body"][0];
		   
		});
		console.log("Este es ===>");
		console.log(resulta);
		// console.log(notas["GetHorarioEstudianteResponse"]);
		// retorno= notas["GetHorarioEstudianteResponse"];
		var datos = JSON.parse(retorno)
		resp.send(datos.Datos);
	  });
	});
	req.write(xml);//xml would have been set somewhere to a complete xml document in the form of a string
	req.end();
	console.log("antes del retorno");
	return retorno;
    } catch (q){return q;}
    


}


module.exports = { 
        testQueue:(req,resp) =>{
		//	sendMsg("Esta es una Prueba!!");
			resp.json("{\"MSG\":\"Mensaje enviado\"}");
		},
	    getDatos: (req, resp) => {
			console.log(req.query);
			console.log("Trae datos paciente=>"+req.query.codigo);
			var retorno = getDaticos(req.query.codigo,req.query.anyo,req.query.sem, resp);
			resp.json(retorno);
		},

		getAnd: (req, res) => {
		 
			console.log("Salvando Archivo del paciente");
			console.log(req.body.id);
			r=0;
			var mensg = JSON.stringify(req.body);
		//	sendMsg(mensg);
			console.log("------------>Enviando y Registrando imagen:"+req.body.nombre);

			// Agregando agilidad y evitando perder imagenes
			/*decode_base64(req.body.imagen, req.body.nombre);
			
		    envioFoto(req);*/
			
				 res.json({'response':"Saved"});

		},
		
    getPage: (req, res) => {
    	

    	console.log("Cponsultando");
    	
    	
    	Request.get(ur+":7007/api/paciente/13", (error, response, body) => {
    		
    	    if(error) {
    	    	console.log("Esta es una prueba");
    	        return console.dir(error);
    	    }
    	    console.dir(JSON.parse(body));
    	    var datos = JSON.parse(body);
    		console.log("Tomando el valor");
    	    console.log(datos.IdPaciente);
    	    res.send(body);
    	});
    },
    
    getPaciente:(req,res)=>{

    	console.log("Consultando Paciente "+ req.params.id);
    	console.log("******************************************");
    	
    	Request.get(ur+":7007/api/paciente/" + req.params.id, (error, response, body) => {
    		
    	    if(error) {
    	    	console.log("Esta es una prueba");
    	        return console.dir(error);
    	    }
    	  //  console.dir(JSON.parse(body));
    	    var datos = JSON.parse(body);
    		console.log("Tomando el valor");
    	    console.log(datos.IdPaciente);
    	 //   console.log(datos);
    	    res.send(body);
    	});
    },
    postImg: (req, res) => {
    //	console.log(req);
    	var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename); 
            fstream = fs.createWriteStream('/tmp/Node/file-upload/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
               // res.redirect('back');
            	res.json({'response':"Saved"});
            });
        });
    	

    },
    getImg: (req, res) => {
    	file = req.params.file;
		var dirname = "/tmp/Node/file-upload";
		var img = fs.readFileSync(dirname + "/uploads/" + file);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');
    },
    
};