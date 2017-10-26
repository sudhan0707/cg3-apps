'use strict';

var express = require('express'),
    config = require('../config'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports.init = function(){

    var app = express();
    this.initMiddleware(app);
    this.initModulesServerRoutes(app);

    app.route('/test')
        .get(function(req, res){
            res.send("Hello World !!") ;
        })
        .post(function(req, res){
            res.send("Hello World !!") ;
        });

    return app;

};

module.exports.initMiddleware = function(app){
    app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
    app.use(bodyParser.json());
    app.use(methodOverride());

};

module.exports.initModulesServerRoutes = function(app){
  config.files.server.routes.forEach(function(routePath){
     require(path.resolve(routePath))(app);
  });
};