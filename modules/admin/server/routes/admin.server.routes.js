'use strict';

var controller = require('../controllers/admin.server.controllers');

module.exports = function(app){

    app.route("/api/admin/question")
        .get(controller.getQuestions)
        .post(controller.saveQuestion);

    app.route("/api/admin/question/:questionId")
        .put(controller.updateQuestion)
        .get(controller.getQuestionById)
        .delete(controller.deleteQuestionById);

    app.param('questionId', controller.questionId);

};