var fs = require('fs');

var path = require('path');
var Request = require("request");
var http = require('http');
var xml2js = require('xml2js');
var soapRequest = require('easy-soap-request'); 
var Msg = require("../models/msg");
const Users= require("../controllers/user.controller.js");
var request = require('request');
User = require("../models/user");


module.exports.addUser =  function (req, res) {
     var  nombre = req.body.nombre;
	  var login = req.body.login;
	  var password = req.body.password;
	  var tipo = req.body.tipo;
	 	  var user = {
			  nombre:nombre,
			  login:login,
			  password:password,
			  tipo:tipo
	  }
    
    console.log("Este es su valor");
    console.log("R:="+user);

    Users.create(user, function (err, user) {
        if(err){
            throw err;
        }
        res.redirect('/list/users');
           
    	  
        
    });


}
module.exports.listaUsers =  function (req, res) {

	
    User.getUsers( function (err, users) {
        if(err){
            throw err;
        }
        res.json(users);
        
    },100);


}
module.exports.leeUser =  function (req, res) {

	  var login = req.query.login;

    
    console.log("Este es su valor");
    console.log("R:="+login);
    User.getUserByLg(login, function (err, user) {
        if(err){
            throw err;
        }
        res.json(user);
        
    });


}


