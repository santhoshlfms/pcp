let config = require("../config/config");
let apiHelper = require("../helpers/apiHelpers");

let helpers = {

    generateAccessToken :  function(callback) {
        let clientId  = config.clientId;
        let secret  = config.secret;
        let auth = 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64');
        console.log(auth);
        var options = {
            'method': 'POST',
            'url': config.sandox.apiUrl+'/v1/oauth2/token',
            'headers': {
              'Authorization': auth,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'grant_type': 'client_credentials',
              'response_type': 'token'
            }
          };
          apiHelper.post(options, (resp)=>{
         
              callback(resp)
          })
    }

}

module.exports = helpers;