var mongoose = require("mongoose");

//Msg Schema
var msgSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
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
    Msg.find(callback).limit(limit);
};

//Add Genre
module.exports.addMsg = function(msg, callback){
    Msg.create(msg, callback);
};

//Update Genre
module.exports.updateMsg = function(id, msg, options, callback){
    var query = {_id: id};
    var update = {
        name: msg.name,
        body: msg.body
    };
    Genre.findOneAndUpdate(query, update, options, callback);
};

//Delete Genre
module.exports.deleteMsg = function(id, callback){
    var query = {_id: id};
    Msg.remove(query, callback);
};