const express = require("express");

var mongoose = require("mongoose");
//Book Schema
var userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    tipo: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model("User", userSchema);

//Get Books
module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
};
module.exports.getUserByLg = function (login, callback) {
   var query = {login: login};	
   User.findOne(query, callback);
};
module.exports.validaUser = function (login, password, dtipo, callback) {
  var user;
  console.log("En valida User "+ login);
   var query = {login: login};	
   User.findOne(query, callback);
   console.log(callback.nombre);
if (callback!=null){
	console.log("El usuario es valida");
   if (callback.password == password)
{
         dtipo = callback.tipo;
  } 
  else dtipo = "none";}
  else dtipo= "none";
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.addUser = function(user, callback){
  User.create(user, callback);
};


module.exports.updateUser = function(id, user, options, callback){
    var query = {_id: id};
    var update = {
        mombre: user.nombre,
        login: user.login,
        tipo: user.tipo,
        password: user.description
    };
    User.findOneAndUpdate(query, update, options, callback);
};

//Delete book
module.exports.deleteUser = function(id, callback){
    var query = {_id: id};
    User.remove(query, callback);
};