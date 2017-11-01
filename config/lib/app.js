'use strict';

var express = require('./express'),
mongoose = require('./mongoose');

module.exports.start = function(callback){

    this.init(function(app, db){

        var _port = 8081;

        app.listen(_port, function(){
            console.log("Application is listening on port : " + _port);
        });
    });

};

module.exports.init = function(callback){
    mongoose.connect(function (db){
        var app = express.init(db);
        if(callback) callback(app, db);
    });
};