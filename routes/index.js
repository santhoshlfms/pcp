var express = require('express');
var router = express.Router();

let config = require("../config/config");
let helper = require("../helpers/helpers");
let payloadHelpers = require("../helpers/payloadHelpers");
let apiHelpers = require("../helpers/apiHelpers");
const uuidv1 = require('uuid/v1');



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'PCP STORE', clientId : config.clientId });
// });

router.get('/', function(req, res, next) {
  res.render('ucc', { title: 'PCP STORE', clientId : config.clientId });
});



router.post('/create-orders', function(req, res, next){
  //get accesstoken
  let merchantEmail = req.query.email;
  console.log('merchantEmail',merchantEmail)
  helper.generateAccessToken((accessToken)=>{
   let accessTokenResp = JSON.parse(accessToken);
   let createOrderPayload = payloadHelpers.createOrders(merchantEmail);
   console.log(JSON.stringify(createOrderPayload))
   if(accessTokenResp.access_token.length > 0) {
      var options = {
        'method': 'POST',
        'url': config.sandox.apiUrl+'/v2/checkout/orders',
        'headers': {
          'Authorization': 'Bearer '+accessTokenResp.access_token,
          'Content-Type': 'application/json',
          'return': 'representation'
        },
        body: JSON.stringify(createOrderPayload)
      };
      apiHelpers.post(options,(respCreateOrders)=>{
        //console.log(respCreateOrders)
        res.json(respCreateOrders)
      })
   }
  })
});


router.post("/capture-payments", function(req, res, next) {
  let orderId = req.query.id;
  console.log(orderId)
  if(orderId) {
    helper.generateAccessToken((accessToken)=>{
      let accessTokenResp = JSON.parse(accessToken);
      if(accessTokenResp.access_token.length > 0) {
        var options = {
          'method': 'POST',
          'url': config.sandox.apiUrl+'/v2/checkout/orders/'+orderId+'/capture',
          'headers': {
            'Authorization': 'Bearer '+accessTokenResp.access_token,
            'Content-Type': 'application/json'
          }
        };
         apiHelpers.post(options,(respCreateOrders)=>{
           //console.log(respCreateOrders)
           res.json(respCreateOrders)
         })
      }
     }) 
  }
});


router.post("/generate-client-token", function(req, res, next) {
  

 
    helper.generateAccessToken((accessToken)=>{
      let accessTokenResp = JSON.parse(accessToken);
      if(accessTokenResp.access_token.length > 0) {
        var options = {
          'method': 'POST',
          'url': config.sandox.apiUrl+'/v1/identity/generate-token',
          'headers': {
            'Authorization': 'Bearer '+accessTokenResp.access_token,
            'Content-Type': 'application/json',
            'Accept-Language' : 'en_US'
          }
        };
        console.log(options)
         apiHelpers.post(options,(respCreateOrders)=>{
           console.log(respCreateOrders)
           res.json(respCreateOrders)
         })
      }
     }) 
  
});


router.post('/merchants-create-orders', function(req, res, next){

  helper.generateAccessToken((accessToken)=>{
   let accessTokenResp = JSON.parse(accessToken);
   let createOrderPayload = payloadHelpers.createOrdersForMerchant(uuidv1());
   console.log(JSON.stringify(createOrderPayload))
   if(accessTokenResp.access_token.length > 0) {
      var options = {
        'method': 'POST',
        'url': config.sandox.apiUrl+'/v2/checkout/orders',
        'headers': {
          'Authorization': 'Bearer '+accessTokenResp.access_token,
          'Content-Type': 'application/json',
          'return': 'representation'
        },
        body: JSON.stringify(createOrderPayload)
      };
      apiHelpers.post(options,(respCreateOrders)=>{
        //console.log(respCreateOrders)
        res.json(respCreateOrders)
      })
   }
  })
});



module.exports = router;
