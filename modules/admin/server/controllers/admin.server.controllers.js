'use strict';

var questions = [];
module.exports.getQuestions = function(request, response){
    response.send(questions);
};

module.exports.saveQuestion = function(request, response){
    var incomingQuestion = request.body;
    console.log(request.body);
    ///..
    var successFlag = true;

    questions.forEach(function(question){
        if(question.topic === incomingQuestion.topic){
            successFlag = false;
            response.send("This topic already exist !!!");
        }else{
            successFlag = true;
        }
    });
    if(!successFlag) return;
    questions.push(incomingQuestion);
    response.send("Success !!");

};

module.exports.updateQuestion = function(request, response){
    var incomingQuestion = request.body,
        incomingQuestionIdForUpdate = request.questionId;

    var isSuccessfullyUpdated = false;

    questions.forEach(function (question, index){
        if(question.id == incomingQuestionIdForUpdate){
            questions[index] = incomingQuestion;
            isSuccessfullyUpdated = true;
        }
    });
    if(isSuccessfullyUpdated){
        response.send("Successfully updated question for id - "+ incomingQuestionIdForUpdate);
    }else{
        response.send("Could not find question for id - "+ incomingQuestionIdForUpdate);
    }
};

module.exports.getQuestionById = function(request, response){
    var incomingQuestionId = request.questionId;

    var isQuestionFound = false;
    questions.forEach(function(question){
        if(question.id === incomingQuestionId){
            response.send(question);
        }
    });
    if(!isQuestionFound) response.send("Unable to find question with id - "+incomingQuestionId);
};

module.exports.deleteQuestionById = function(request, response){
    var incomingQuestionId = request.questionId;

    var isQuestionDeleted = false;
    questions.forEach(function(question, index){
        if(question.id === incomingQuestionId){
            questions.slice(1,index);
            response.send("Successfully deleted question with id - "+ incomingQuestionId);
        }
    });
    if(!isQuestionDeleted) response.send("Unable to find question with id - "+incomingQuestionId);
};



module.exports.questionId = function (request, response, next, questionId) {
    if(!questionId)
        response.send("Invalid argument questionId - Cannot be null or empty");
    request.questionId = questionId;
    next();
};

