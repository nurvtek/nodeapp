const request = require('request');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const db = require("../models");
const Useris = db.user;
const Asocia = db.asocia
const Op = db.Sequelize.Op;
const con = mysql.createConnection({
	host     : '127.0.0.1',
	user     : 'root',
	password : 'N057r4d4mu$',
	port     : 3306,
	database : 'Tuwe'
  }); 
 // support encoded bodies
qs = require('querystring');
var Msg = require("../models/msg");
var User = require("../models/user");
const Users= require("../controllers/user.controller.js");
const { rmSync } = require('fs');
var asuntillo = " "
var usuario = " ";
var nombreUsuario = " ";
var password = " ";
var soy = "COORDINACIÓN ACADÉMICA"
/* GET home page. */
router.post('/list/index', function(req, res, next) {
	    var dtipo = "none";
      if (!req.session.usuario)
    	  {
              usuario = req.body.usuario;
    	      password = req.body.password;
			  req.session.usuario = req.body.usuario;
			  req.session.password = req.body.password;
    	  } 
		  console.log("Este es en post index primera parte");
		  req.query.tipo="Libre";
		  console.log("Este es en post index primera parte dos");
		  let stmt = 'SELECT * FROM 2W_INSTORG;';
		  con.query(stmt,(err,rows) => {
		  if (err) {
			res.send(err.message);
			
		  }
		  // get inserted id
		  res.render('index', {page:'INSTRUMENTOS', menuId:'home', msgs:rows, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
    	      
		  //console.log(rows);
		 // res.send(rows);
		  
		  });
		  Users.findAll(req,res);
		  console.log("Este es en post index primera parte tres ");
		  var msgs = [];
		  //res.render('index', {page:'NOTIFICACIONES', menuId:'home', msgs:rows, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
    	       
          User.getUserByLg(usuario, function (err, user) {
              if(err){
                     throw err;
               }
               console.log(user);
           if(user){

            if (user.login == usuario && user.password == password){
            	dtipo = user.tipo;
            	nombreUsuario = user.nombre;
            }
           }
           else  
             if (usuario == "admin" && password == "nostradamus")  dtipo = "temporal";
            

    	 
    	    if (dtipo != "none")
    		 {
    			 soy= usuario;
    	         Msg.getMsgs(function (err, msgs) {
    		 
    	           if(err){
    	            throw err;
    	           }
    	          req.session.usuario = req.body.usuario;
    	          req.session.password = req.body.password;
    	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
    	          res.render('index', {page:'INSTRUMENTOS', menuId:'home', msgs:msgs, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
    	         });
    		 }
    	    else
    		   res.render('error',{status:'Login Errado', message:'Usuario o password invalido',page:'Error', menuId:'home', usuario:req.session.usuario, nom:nombreUsuario});
        

         });
     });
router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        asuntillo = " "
        usuario = " ";
        nombreUsuario = " ";
        password = " ";
        soy = "COORDINACIÓN ACADÉMICA"
        res.redirect('/list');
    });

});

router.get('/api/getUsers', function(req, res, next) {
	
 
 			 
 	 User.getUsers(function (err, users) {
 		 
 	        if(err){
 	            throw err;
 	        }
 	     
 	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
 	        res.json(users);
 	    });
 		
  });

router.get('/list/users', function(req, res, next) {
	   var usersi={};
	   var tipo="Usuario"; //req.query.tipo;

       if (req.session.usuario)
    	
    	{ 
			var users = [];
			var condition = tipo ? { tipo: { [Op.like]: `%${tipo}%` } } : null;
			Useris.findAll({ where: condition })
			  .then(data => {
			   // console.log(data);
			   users = [];
				for (var i=0;i< data.length; i++)
				{
				   users.push(data[i].dataValues);
				}
				console.log("MMs MMs Este es el valor de DATA ");
				console.log(users);
		        res.render('indexUsers', {page:'Usuarios', menuId:'home', usuarios:users, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
				console.log("FFs FFs Este es el valor de DATA ");
			   //  return users;
				// res.send(data);
			  })
			   .catch(err => {
				res.status(500).send({
				   message:
					err.message || "Algunos errores se presentaron tratando de recuperar la lista de usuarios."
				 });
			   });
	
		   console.log(">>>>>>>======>>>>>>>>>DATOS EJEMPLOS FUNCION");
       }
      
    		
     });
	 router.post('/aca/asocia', function(req, res, next) {
		var  nombre = req.body.nombre;
		var email = req.body.email;
		var empresa = req.body.empresa;
		var telefono = req.body.telefono;
		var sector = req.body.sector;
			 var asocia = {
				nombre:nombre,
				email:email,
				empresa:empresa,
				telefono:telefono,
				sector:sector
		}
	  
	  console.log("Este es su valor");
	
  
	  Asocia.create(asocia, function (err) {
		  if(err){
			  throw err;
		  }
		  console.log('Redireccionando al list users')
		  res.redirect('/list/users');
			 
			
		  
	  });
	 });
	 router.get('/list/asocia', function(req, res, next) {
		var usersi={};
		var tipo="Usuario"; //req.query.tipo;
 
		if (req.session.usuario)
		 
		 { 
			 var users = [];
			 var condition = tipo ? { tipo: { [Op.like]: `%${tipo}%` } } : null;
			 Asocia.findAll()
			   .then(data => {
				// console.log(data);
				users = [];
				 for (var i=0;i< data.length; i++)
				 {
					users.push(data[i].dataValues);
				 }
				 console.log("XXXXYYYXYYXYXYXYXYXs MMs Este es el valor de DATA ");
				 console.log(users);
				 res.render('indexAsoc', {page:'Usuarios', menuId:'home', usuarios:users, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
				 console.log("FFFFFFSFGSGGSGGHHSHHSHs FFs Este es el valor de DATA ");
				//  return users;
				 // res.send(data);
			   })
				.catch(err => {
				 res.status(500).send({
					message:
					 err.message || "Algunos errores se presentaron tratando de recuperar la lista de usuarios."
				  });
				});
	 
			console.log(">>>>>>>======>>>>>>>>>DATOS EJEMPLOS FUNCION");
		}
	   
			 
	  });
 
	
router.get('/list/deleteUsr', function(req, res, next) {
	
       if (req.session.usuario)
    	
    	{
	     
          var id = req.query.id;

//// ------------------------------------


		Useris.destroy({
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
			res.send({
				message: "Usuario fue eliminado!"
			});
			} else {
			res.send({
				message: `No puede eliminar usuario con  id=${id}. Puede que no exista!`
			});
			}
		})
		.catch(err => {
			res.status(500).send({
			message: "No se puede eliminar el usuario con id=" + id
			});
		});

//// ------------------------------------
   			 
    //	 User.getUsers(function (err, users) {
    		 
    //	        if(err){
    //	            throw err;
    //	        }
    	     
    	    
    //	        res.render('indexUsers', {page:'Usuarios', menuId:'home', usuarios:users, tipo:0 , usuario:req.session.usuario, nom:nombreUsuario});
    //	    });
       }
    //  else res.redirect('/list'); 
    		
     });
router.get('/list/getUsuarios', function(req, res, next) {
	var apat = req.query.apat;
	var amat = req.query.amat;
	var nomb = req.query.nomb;
	var tipo = req.query.tipo;
	if (apat==undefined)apat=" ";
	if (amat==undefined)amat=" ";
	if (nomb==undefined)nomb=" ";
	if (tipo==undefined)tipo="P";
	
    if (req.session.usuario)
 	
 	{
	      
	      let url = "http://localhost:22022/personas";
	      url = url + "?apat="+apat;
          if (amat!=" ") url = url + "&amat="+amat;
          if (nomb!=" ") url = url + "&nomb="+nomb;
	      let options = {json: true};
	      console.log("URL="+url);
          request(url, options, (error, reso, body) => {
	          if (error) {
	              return  console.log(error)
	          };
	          console.log("Resultado="+body);
	          if (!error && reso.statusCode == 200) {
	        	  res.render('buscaGente', {page:'Usuarios', menuId:'home', personas:body, tipo:0 , usuario:'Pedro', nom:nombreUsuario});
	              // do something with JSON, using the 'body' variable
	          };
	        
 			 
 	
 	     
 	    
 	        
 	    });
    }
   else res.redirect('/list'); 
 		
  });

router.post('/list/procesa', function(req, res, next) {
	
	  var dest = req.body.destinatario;
	  var remi = req.body.remitente;
	  var asun = req.body.asunto;
	  var cuer = req.body.body;
	  var rece = "N";
	  var msg = {
			  destinatario:dest,
			  remitente:remi,
			  recepcion:rece,
			  asunto:asun,
			  cuerpo:cuer
	  }

	  Msg.addMsg(msg, function (err, msg) {
	        if(err){
	            throw err;
	        }
	       // res.json(msg);
	    });
	  Msg.getMsgs(function (err, msgs) {
 		 
	        if(err){
	            throw err;
	        }
	       
	     
	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
	        asuntillo = " ";
	        res.render('index', {page:'NOTIFICACIONES', menuId:'home', msgs:msgs, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
	    });
	});
	

router.get('/list/delete', function(req, res, next) {
	
	  var id = req.query.id;
      console.log("Este es el valor del mensaje :"+id);

	  Msg.deleteMsg(id, function (err, msg) {
	        if(err){
	            throw err;
	        }
	       // res.json(msg);
	    });
	  Msg.getMsgs(function (err, msgs) {
 		 
	        if(err){
	            throw err;
	        }
	       
	        
	     
	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
	        res.render('index', {page:'NOTIFICACIONES', menuId:'home', msgs:msgs, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
	    });
	});	
	
	
router.get('/list/about', function(req, res, next) {
  res.render('about', {page:'Instalador APP', menuId:'about', usuario:req.session.usuario, nom:nombreUsuario});
});
router.get('/list/procesa', function(req, res, next) {
	 if (req.session.usuario)
    	
    	{
	   var valor;
	   if (req.query.asunto != null){
	     valor = "Re: "+req.query.asunto;
	     asuntillo = valor;
	   } else
		   {valor = asuntillo}
	   
	  res.render('smessage', {page:'Enviar Mensaje', destinatario:req.query.destinatario, asunto:valor, remite:soy, menuId:'home', usuario:req.session.usuario, nom:nombreUsuario});
}
   else  res.redirect('/list'); 
	});
router.get('/list/showmsg', function(req, res, next) {
	 if (req.session.usuario)
      {
	  var dest = req.query.destinatario;
	  var remi = req.query.remitente;
	  var asun = req.query.asunto;
	  var cuer = req.query.body;
	  var rece = "N";
	  var msg = {
			  destinatario:dest,
			  remitente:remi,
			  recepcion:rece,
			  asunto:asun,
			  cuerpo:cuer
	  }
	  res.render('rmessage', {page:'Visualizar Mensaje', destinatario:req.query.destinatario, menuId:'home', msg:msg, usuario:req.session.usuario, nom:nombreUsuario});
}   else  res.redirect('/list');
	});
	
	
	

router.get('/list/contact', function(req, res, next) {
	  res.render('contact', {page:'Instrucciones de instalación', menuId:'contact', usuario:req.session.usuario, nom:nombreUsuario});
	});
router.get('/list/admin', function(req, res, next) {
	 if (req.session.usuario)
      {
	     res.render('admin', {page:'Administracion', menuId:'contact', usuario:req.session.usuario, nom:nombreUsuario});
      }   else  res.redirect('/list');
	});
router.get('/list', function(req, res, next) {
	 if (!req.session.usuario)
	  {
    
	  res.render('login', {page:'Login', menuId:'home', usuario:req.session.usuario, nom:nombreUsuario});
	  }
	 else
		 {
			let stmt = 'SELECT * FROM 2W_INSTORG;';
			con.query(stmt,(err,rows) => {
		
    		 
 	        if(err){
 	            throw err;
 	        }
 	     
 	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
		   res.render('index', {page:'INSTRUMENTOS', menuId:'home', msgs:rows, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
 	     //   res.render('index', {page:'NOTIFICACIONES', menuId:'home', msgs:msgs, tipo:0, usuario:req.session.usuario, nom:nombreUsuario});
 	    });
      }
	});
router.get('/liste', function(req, res, next) {
	 if (!req.session.usuario)
	  {
   
	  res.render('login', {page:'Login', menuId:'home', usuario:req.session.usuario, nom:nombreUsuario});
	  }
	 else
		 {
		 Msg.getMsgsRm(soy,function (err, msgs) {
   		 
	        if(err){
	            throw err;
	        }
	     
	        
	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
	        res.render('index', {page:'NOTIFICACIONES ENVIADAS', menuId:'home', msgs:msgs, tipo:1, usuario:req.session.usuario, nom:nombreUsuario});
	    });
     }
	});
router.get('/listr', function(req, res, next) {
	 if (!req.session.usuario)
	  {
   
	  res.render('login', {page:'Login', menuId:'home', usuario:req.session.usuario, nom:nombreUsuario});
	  }
	 else
		 {
		 Msg.getMsgsDst(soy,function (err, msgs) {
   		 
	        if(err){
	            throw err;
	        }
	     
	      //  console.log("Este es el valor del mensaje :"+msgs[0].asunto);
	        res.render('index', {page:'NOTIFICACIONES RECIBIDAS', menuId:'home', msgs:msgs, tipo:2, usuario:req.session.usuario, nom:nombreUsuario});
	    });
     }
	});
router.get('/list/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact', usuario:req.session.usuario, nom:nombreUsuario});
});
router.get('/aca/user', function(req, res, next) {
  res.render('usuarios', {page:'Usuarios', menuId:'contact', usuario:req.session.usuario, nom:nombreUsuario});
});

module.exports = router;
