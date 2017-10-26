'use strict';

var controller = require('../controllers/admin.server.controllers');

module.exports = function(app){

    app.route("/api/admin/question")
        .get(controller.getQuestions)
        .post(controller.saveQuestion);


};