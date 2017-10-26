'use strict';

module.exports = function(app){

    app.route("/api/user1")
        .get(function(request, response, next){
            response.send("Response from user route");
        });

};