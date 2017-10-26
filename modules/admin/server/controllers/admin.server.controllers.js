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

