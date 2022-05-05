var mongoose = require("mongoose");

//Msg Schema
var msgSchema = mongoose.Schema({
    destinatario: {
        type: String,
        required: true
    },
    remitente: {
        type: String,
        required: true
    },
    recepcion: {
        type: String,
        required: true
    },
    asunto: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Msg = module.exports = mongoose.model("Msg", msgSchema);

//Get Genres
module.exports.getMsgs = function(callback, limit){
	
    Msg.find(callback).sort({create_date: -1}).limit(limit);
};
module.exports.getMsgsRm = function(remite,callback, limit){
	console.log("Este es el valor del remite :"+remite);
    Msg.find({'remitente':remite},callback).sort({create_date: -1}).limit(limit);
};
module.exports.getMsgsDst = function(destino,callback, limit){
	console.log("Este es el valor del destino :"+destino);
    Msg.find({'destinatario':destino},callback).sort({create_date: -1}).limit(limit);
};
module.exports.getMsgById = function(id, callback){
	 var query = {_id: id};
	 Msg.findOne(query, callback);
}
//Add Genre
module.exports.addMsg = function(msg, callback){
    Msg.create(msg, callback);
};

//Update Genre
module.exports.updateMsg = function(id, msg, options, callback){
    var query = {_id: id};
    var update = {
        destinatario: msg.destinatario,
        remitente: msg.remitente,
        recepcion: msg.recepcion,
        asunto: msg.asunto,
        cuerpo: msg.cuerpo
    };
    Msg.findOneAndUpdate(query, update, options, callback);
};

//Delete Genre
module.exports.deleteMsg = function(id, callback){
    var query = {_id: id};
    Msg.remove(query, callback);
};