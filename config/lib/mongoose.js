/**
 * Created by Owner on 10/31/17.
 */
'use strict';

var mongoose = require('mongoose');

module.exports.connect = function(callback){

    var db = mongoose.connect("mongodb://localhost:27017/local", {
        user:'', pass:''
    }, function(err){
       if(err){
           console.log("Error occured during database connection");
           console.log(err);
       } else {
           mongoose.set('debug', true);
           if(callback) callback(db);
       }
    });
};