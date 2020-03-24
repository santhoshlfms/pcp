var request = require('request');

let apiHelpers = {

    post : function(options, callback){
        request(options, function (error, response) { 
            if (error) {
                callback(new Error(error));
            };
            callback(response.body);
          });
    }

}

module.exports = apiHelpers;