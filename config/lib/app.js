'use strict';

var express = require('./express');

module.exports.start = function(callback){
    var app = express.init();

    var _port = 8081;

    app.listen(_port, function(){
        console.log("Application is listening on port : " + _port);
    });
};