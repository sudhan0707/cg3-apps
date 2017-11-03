'use strict';

var express = require('express'),
    config = require('../config'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports.init = function(db){

    var app = express();
    this.initMiddleware(app);
    this.initModels(app,db);
    this.initModulesServerRoutes(app);


    return app;

};

module.exports.initModels = function(app, db){
    config.files.server.models.forEach(function(model){
        require(path.resolve(model));
    });
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